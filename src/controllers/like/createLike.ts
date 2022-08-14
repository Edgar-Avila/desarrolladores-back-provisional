import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import db from "../../db";
import { isPositiveInt } from "../../util";

export const createLike = async (req: Request, res: Response) => {
    // Get and validate all
    const { postId } = req.body;
    const userId = res.locals.userId;
    if(!isPositiveInt(postId) || !isPositiveInt(userId)){
        return res.sendStatus(400);
    }

    // Create and send
    try{
        const like = await db.like.create({ 
            data: {
                UserID: Number(userId),
                PostID: Number(userId)
            }
        });
        res.status(201).json(like);
    }
    catch(err) {
        if(err instanceof PrismaClientKnownRequestError){
            // If Post does not exist
            if(err.code == "P2003"){
                return res.sendStatus(409);
            }
        }

        // Other error
        res.sendStatus(500);
    }
}