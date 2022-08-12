import { Request, Response } from "express";
import db from "../../db";

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const {username, password} = req.body;
    await db.user.update({
        where:{
            UserID: id
        },
        data: {
            Username: username,
            Password: password,
        }
    });
    res.json({
        message: 'OK'
    });
}