import { Request, Response } from "express";
import db from "../db";

export const createPost = async (req: Request, res: Response) => {
    const { userId, title, content}:
    {userId: number; title: string, content: string} = req.body;
    await db.post.create({ 
        data: {
            UserID: userId,
            Title: title,
            Content: content,
        }
    });
    res.json({
        message: 'OK'
    });
};

export const getPosts = async (req: Request, res: Response) => {
    const posts = await db.post.findMany();
    res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const post = await db.post.findUnique({
        where: {
            PostID: id
        }
    });
    res.json(post);
}

export const updatePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const { userId, title, content}:
    {userId: number; title: string, content: string} = req.body;
    await db.post.update({
        where:{
            PostID: id
        },
        data:{
            UserID: userId,
            Title: title,
            Content: content,
        }
    });
    res.json({
        message: 'OK'
    });
}

export const deletePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    await db.post.delete({
        where: {
            PostID: id
        }
    });
    res.json({
        message: 'OK'
    });
}