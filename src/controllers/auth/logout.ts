import { Request, Response } from "express";
import db from "../../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserPayload } from "../../types/jwt";

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