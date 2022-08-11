import { Request, Response } from "express";
import db from "../../db";

export const getPosts = async (req: Request, res: Response) => {
    // Get and send
    const posts = await db.post.findMany();
    res.json(posts);
};