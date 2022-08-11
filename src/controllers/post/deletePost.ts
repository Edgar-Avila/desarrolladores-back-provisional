import { Request, Response } from "express";
import { isPositiveInt } from "../../util";
import db from "../../db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


export const deletePost = async (req: Request, res: Response) => {
    // Get and validate all
    const id = req.params['id'];
    const userId = res.locals.userId;
    if(!isPositiveInt(id) || !isPositiveInt(userId)){
        return res.sendStatus(400);
    }

    // Find post
    const post = await db.post.findUnique({
        where: {
            PostID: Number(id)
        }
    });

    // If post not found
    if(!post){
        return res.sendStatus(404);
    }

    // If user trying to delete post owned by another user
    if(post.UserID != userId){
        return res.sendStatus(403);
    }

    // Delete post
    await db.post.delete({
        where: {
            PostID: Number(id)
        }
    });
    res.sendStatus(200);
}