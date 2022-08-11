import { Request, Response } from "express";
import { isPositiveInt } from "../util";
import db from "../db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

// Helper function to validate body
const isValidBody = (title: any, content: any, imageUrl: any, languageId: any): boolean => {
    return (typeof title == "string") &&
    (typeof content == "string") &&
    (typeof imageUrl == "string" || typeof imageUrl == "undefined") &&
    (typeof languageId == "number" || typeof languageId == "undefined");
}

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

export const getPosts = async (req: Request, res: Response) => {
    // Get and send
    const posts = await db.post.findMany();
    res.json(posts);
};

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
        }
    });

    // If post not found
    if(!post){
        return res.sendStatus(404);
    }

    // If post found send post 
    res.json(post);
}

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

export const deletePost = async (req: Request, res: Response) => {
    // Get and validate all
    const id = req.params['id'];
    const userId = res.locals.userId;
    if(!isPositiveInt(id) || !isPositiveInt(userId)){
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

    // If user trying to delete post owned by another user
    if(post.UserID != userId){
        return res.sendStatus(403);
    }

    // Delete post
    await db.post.delete({
        where: {
            PostID: Number(id)
        }
    });
    res.sendStatus(200);
}