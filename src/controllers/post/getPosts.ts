import { Request, Response } from "express";
import db from "../../db";

export const getPosts = async (req: Request, res: Response) => {
    let langName = req.query.lang;

    if(langName){
        langName = langName as string;
    }

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
        },
        where: {
            ProgrammingLanguage: {
                Name: langName
            }
        }
    });

    res.json(posts);
};