import { Request, Response } from "express";
import db from "../db";
import bcrypt from 'bcrypt';
import { prisma, Prisma, User } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { UserPayload } from "../types/jwt";

export const register = async (req: Request, res: Response) => {
    // Grab username, password and email from req.body
    const {username, password, email} : 
    {username: string, password: string, email: string} = req.body;
    if(!username || !password || !email){
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }
    try {
        // Hash the password
        const hashed = await bcrypt.hash(password, 10);

        // Store in database
        await db.user.create({
            data: {
                Username: username,
                Password: hashed,
                Email: email,
                CreatedDate: new Date()
            }
        });
        res.status(201).json({'message': `New user ${username} created`});
    } 
    catch (err) {
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            // Unique constraint error on username
            if (err.code === 'P2002') {
                res.sendStatus(409);
            }
        }
        else if (err instanceof Error) {
            // Other errors
            res.status(500).json({
                message: err.message
            });
        }
    }
}

export const login = async (req: Request, res: Response) => {
    // Grab username and password from body
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    // Check user existence in database
    const user = await db.user.findUnique({
        where: {
            Username: username
        }
    });
    if(!user){
        return res.sendStatus(401);
    }

    // Compare password
    const match = await bcrypt.compare(password, user.Password);
    if(match){
        // Sign access and refresh tokens
        const payload: UserPayload = {
            username: user.Username,
            id: user.UserID 
        };
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '1d' }
        );

        // Encrypt refresh token
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        // Update refresh token in database
        await db.user.update({
            where: {
                Username: username
            },
            data: {
                RefreshToken: hashedRefreshToken
            }
        });

        // Send back refresh token and access token
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 });
        res.json({ accessToken });
    }
    else{
        res.sendStatus(401);
    }
}

export const refresh = async (req: Request, res: Response) => {
    // Get refresh token from cookie
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt as string;
    
    // Verify validity of refresh token
    let payload: UserPayload
    try {
        payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as UserPayload;
    } catch(err){
        return res.sendStatus(403);
    }

    // Make sure refresh token is in database
    const user = await db.user.findUnique({
        where: {
            UserID: payload.id
        }
    });
    if(!user?.RefreshToken){
        return res.sendStatus(403);
    }

    // Make sure refresh token in db and refresh token in cookie match
    const match = await bcrypt.compare(refreshToken, user.RefreshToken)
    if(!match){
        return res.sendStatus(403);
    }
    
    // Create new access token and send it
    const newPayload: UserPayload = {username: payload.username, id: payload.id};
    const accessToken = jwt.sign(newPayload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
    res.json({ accessToken });
}

export const logout = async (req: Request, res: Response) => {
    // Get refresh token from cookie
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt as string;
    
    // Decode refresh token
    let payload: UserPayload
    try {
        payload = jwt.decode(refreshToken) as UserPayload;
    } catch(err){
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    // Check if refresh token in db
    const user = await db.user.findUnique({
        where: {
            UserID: payload.id
        }
    });
    if(!user?.RefreshToken){
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    // Make sure refresh token in db and refresh token in cookie match
    const match = await bcrypt.compare(refreshToken, user.RefreshToken)
    if(!match){
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    // Delete refresh token from db
    try {
        db.user.delete({
            where: {
                UserID: payload.id
            }
        });
    } catch(err) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }
    res.sendStatus(200);
}