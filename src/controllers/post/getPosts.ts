import { Request, Response } from "express";
import db from "../../db";
import { isPositiveInt } from "../../util";

export const getPosts = async (req: Request, res: Response) => {
    let langName = req.query.lang;
    let page = req.query.page;
    let pagination = {};

    if(langName){
        langName = langName as string;
    }
    if(page){
        page = page as string;
        if(!isPositiveInt(page)){
            return res.sendStatus(400);
        }
        pagination = {
            skip: (Number(page)-1)*10,
            take: 10,
        }
    }

    // Get and send
    let posts = await db.post.findMany({
        ...pagination,
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