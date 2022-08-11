import { Request, Response } from "express";
import db from "../../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserPayload } from "../../types/jwt";

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