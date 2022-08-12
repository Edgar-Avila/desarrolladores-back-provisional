import { Request, Response } from "express";
import db from "../../db";

export const createUser = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    await db.user.create({
        data: {
            Username: username,
            Password: password,
        }
    });
    res.json({
        message: 'OK'
    });
};