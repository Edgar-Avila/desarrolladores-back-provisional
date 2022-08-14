import { Request, Response } from "express";
import db from "../../db";
import { isPositiveInt } from "../../util";

export const getPost = async (req: Request, res: Response) => {
    // Get and validate id
    const id = req.params['id'];
    if(!isPositiveInt(id)){
        return res.sendStatus(400);
    }

    // Get post from db
    const post = await db.post.findUnique({
        where: {
            PostID: Number(id)
        },
        include: {
            ProgrammingLanguage: true,
            Comment: true,
            _count: {
                select:{
                    Like: true,
                    Comment: true
                }
            }
        }
    });

    // If post not found
    if(!post){
        return res.sendStatus(404);
    }

    // If post found send post 
    res.json(post);
}