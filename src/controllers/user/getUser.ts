import { Request, Response } from "express";
import db from "../../db";

export const getUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const user = await db.user.findUnique({
        where: {
            UserID: id
        }
    });
    res.json(user);
}