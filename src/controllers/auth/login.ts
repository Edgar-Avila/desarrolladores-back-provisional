import { Request, Response } from "express";
import db from "../../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserPayload } from "../../types/jwt";

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