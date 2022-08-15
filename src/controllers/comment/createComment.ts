import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import db from "../../db";
import { isPositiveInt } from "../../util";

export const createComment = async (req: Request, res: Response) => {
    // Get and validate all
    const { answeredId, postId, content } = req.body;
    const userId = res.locals.userId;
    let answeredIdParam: undefined | number = undefined;

    // If postId not a positive int
    if(!isPositiveInt(postId) || !isPositiveInt(userId)){
        return res.sendStatus(400);
    }
    if(answeredId){
        if(isPositiveInt(answeredId)){
            answeredIdParam = Number(answeredId);

            // Find answered comment
            const answered = await db.comment.findUnique({
                where: {
                    CommentID: answeredId
                }
            });

            // If answered comment does not exist
            if(!answered) {
                return res.sendStatus(409);
            }

            // If answered comment not in the same post
            if(answered.PostID != postId){
                return res.sendStatus(409);
            }
        }
        // If id passed is not a positive int
        else{
            return res.sendStatus(400);
        }
    }

    // If no content
    if(!content){
        return res.sendStatus(400);
    }
    
    // Create and send
    try{
        const comment = await db.comment.create({ 
            data: {
                UserID: Number(userId),
                PostID: Number(postId),
                AnsweredID: answeredIdParam,
                Content: content
            }
        });
        res.status(201).json(comment);
    }
    catch(err) {
        if(err instanceof PrismaClientKnownRequestError){
            // If Post or Answered do not exist
            if(err.code == "P2003"){
                console.log(err.message)
                return res.sendStatus(409);
            }
        }

        // Other error
        res.sendStatus(500);
    }
}