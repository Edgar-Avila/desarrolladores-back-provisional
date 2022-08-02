import { Request, Response } from "express";
import db from "../db";

export const createPostType = async (req: Request, res: Response) => {
    const {name, languageId}: {name: string; languageId: number} = req.body;
    await db.postType.create({
        data: {
            Name: name,
            LanguageID: languageId,
        }
    });
    res.json({
        message: 'OK'
    });
};

export const getPostTypes = async (req: Request, res: Response) => {
    const postTypes = await db.postType.findMany();
    res.json(postTypes);
};

export const getPostType = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const postType = await db.postType.findUnique({
        where: {
            PostTypeID: id
        }
    });
    res.json(postType);
}

export const updatePostType = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const {name, languageId}: {name: string; languageId: number} = req.body;
    await db.postType.update({
        where:{
            PostTypeID: id
        },
        data: {
            Name: name,
            LanguageID: languageId,
        }
    });
    res.json({
        message: 'OK'
    });
}

export const deletePostType = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    await db.postType.delete({
        where: {
            PostTypeID: id
        }
    });
    res.json({
        message: 'OK'
    });
}