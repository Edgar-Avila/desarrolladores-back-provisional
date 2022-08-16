import { Request, Response } from "express";
import db from "../../db";

export const getPostsByLanguage = async (req: Request, res: Response) => {
    // Get post from db
    const language = await db.programmingLanguage.findMany({
        include: {
            Post: true
        }
    });

    // If post not found
    if(!language){
        return res.sendStatus(404);
    }

    // If post found send post 
    res.json(language);
}
