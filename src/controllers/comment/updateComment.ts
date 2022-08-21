import { Request, Response } from "express";
import { isPositiveInt } from "../../util";
import db from "../../db";

export const updateComment = async (req: Request, res: Response) => {
    // Get all
    const commentId = req.params['id'];
    const { content } = req.body;
    const userId = res.locals.userId;

    // Validate all
    if(!content || !isPositiveInt(commentId)){
        return res.sendStatus(400);
    }

    // Find comment
    const comment = await db.comment.findUnique({
        where: {
            CommentID: Number(commentId)
        }
    });

    // If comment not found
    if(!comment){
        return res.sendStatus(404);
    }

    // If user trying to update comment owned by another user
    if(comment.UserID != userId){
        return res.sendStatus(403);
    }

    // Update comment
    try{
        await db.comment.update({
            where:{
                CommentID: Number(commentId)
            },
            data:{
                Content: content,
            }
        });
        res.sendStatus(200);
    }
    catch(err){
        res.sendStatus(500);
    }
}
