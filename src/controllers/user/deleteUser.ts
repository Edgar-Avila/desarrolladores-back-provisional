import { Request, Response } from "express";
import db from "../../db";

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    await db.user.delete({
        where: {
            UserID: id
        }
    });
    res.json({
        message: 'OK'
    });
}