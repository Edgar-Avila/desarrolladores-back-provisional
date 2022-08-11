import { Request, Response } from "express";
import { isPositiveInt } from "../../util";
import db from "../../db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { isValidBody } from "./helper";

export const updatePost = async (req: Request, res: Response) => {
    // Get and validate all
    const id = req.params['id'];
    const { title, content, imageUrl, languageId } = req.body;
    const userId = res.locals.userId;
    const validBody = isValidBody(title, content, imageUrl, languageId);
    if(!validBody || !isPositiveInt(userId) || !isPositiveInt(id)){
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

    // If user trying to update post owned by another user
    if(post.UserID != userId){
        return res.sendStatus(403);
    }

    // Update post
    try{
        await db.post.update({
            where:{
                PostID: Number(id)
            },
            data:{
                UserID: userId,
                Title: title,
                Content: content,
                ImageUrl: imageUrl,
                LanguageID: languageId
            }
        });
        res.sendStatus(200);
    }
    catch(err){
        if(err instanceof PrismaClientKnownRequestError){
            // If Language does not exist
            if(err.code == "P2003"){
                return res.sendStatus(409);
            }
        }

        // Other error
        res.sendStatus(500);
    }
}