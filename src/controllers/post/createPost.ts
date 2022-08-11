import { Request, Response } from "express";
import { isPositiveInt } from "../../util";
import db from "../../db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { isValidBody } from "./helper";

export const createPost = async (req: Request, res: Response) => {
    // Get and validate all
    const { title, content, imageUrl, languageId } = req.body;
    const userId = res.locals.userId;
    const validBody = isValidBody(title, content, imageUrl, languageId);
    if(!validBody || !isPositiveInt(userId)){
        return res.sendStatus(400);
    }

    // Create and send
    try{
        const post = await db.post.create({ 
            data: {
                UserID: userId,
                Title: title,
                Content: content,
                ImageUrl: imageUrl,
                LanguageID: languageId
            }
        });
        res.status(201).json(post);
    }
    catch(err) {
        if(err instanceof PrismaClientKnownRequestError){
            // If Language does not exist
            if(err.code == "P2003"){
                return res.sendStatus(409);
            }
        }

        // Other error
        res.sendStatus(500);
    }
};