import { Request, Response } from "express";
import { isPositiveInt } from "../../util";
import db from "../../db";


export const deleteLike = async (req: Request, res: Response) => {
    // Get and validate all
    const { postId } = req.body;
    const userId = res.locals.userId;
    if(!isPositiveInt(postId) || !isPositiveInt(userId)){
        return res.sendStatus(400);
    }

    // Find like
    const like = await db.like.findUnique({
        where: {
            UserID_PostID: {
                PostID: Number(postId),
                UserID: Number(userId)
            }
        }
    });

    // If like not found
    if(!like){
        return res.sendStatus(404);
    }

    // Delete post
    await db.like.delete({
        where: {
            UserID_PostID: {
                UserID: Number(userId),
                PostID: Number(postId)
            }
        }
    });
    res.sendStatus(200);
}