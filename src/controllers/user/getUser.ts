import { Request, Response } from "express";
import db from "../../db";
import { isPositiveInt } from "../../util";

export const getUser = async (req: Request, res: Response) => {
    // Get and validate id
    const id = req.params['id'];
    if(!isPositiveInt(id)){
        return res.sendStatus(400);
    }

    // Find in db
    const user = await db.user.findUnique({
        where: {
            UserID: Number(id)
        },
        select: {
            UserID: true,
            Username: true,
            ProfilePictureUrl: true,
        }
    });

    // If user not found in db
    if(!user){
        return res.sendStatus(404);
    }

    // If user found send it
    res.json(user);
}