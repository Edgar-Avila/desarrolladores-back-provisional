import { Request, Response } from "express";
import db from "../../db";
import { isPositiveInt } from "../../util";

export const deleteUser = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    if(!isPositiveInt(userId)){
        return res.sendStatus(400);
    }
    await db.user.delete({
        where: {
            UserID: Number(userId)
        }
    });
    res.sendStatus(200);
}