import { Request, Response } from "express";
import { isPositiveInt } from "../../util";
import db from "../../db";


export const deleteComment = async (req: Request, res: Response) => {
    // Get and validate all
    const commentId = req.params['id'];
    const userId = res.locals.userId;
    if(!isPositiveInt(commentId) || !isPositiveInt(userId)){
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

    // If user trying to delete comment owned by another user
    if(comment.UserID != Number(userId)){
        return res.sendStatus(403);
    }

    // Delete comment
    await db.comment.delete({
        where: {
            CommentID: Number(commentId)
        }
    });

    // Send status
    res.sendStatus(200);
}