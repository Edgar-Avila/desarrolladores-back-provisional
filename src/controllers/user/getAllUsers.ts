import { Request, Response } from "express";
import db from "../../db";

export const getUsers = async (req: Request, res: Response) => {
    const users = await db.user.findMany();
    res.json(users);
};