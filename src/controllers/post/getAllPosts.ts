import { Request, Response } from "express";
import db from "../../db";

export const getPosts = async (req: Request, res: Response) => {
    // Get and send
    let posts = await db.post.findMany({
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

    res.json(posts);
};