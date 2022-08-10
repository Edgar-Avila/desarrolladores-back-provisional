import { Request, Response } from "express";
import db from "../db";

export const createUser = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    await db.user.create({
        data: {
            Username: username,
            Password: password,
        }
    });
    res.json({
        message: 'OK'
    });
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await db.user.findMany();
    res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const user = await db.user.findUnique({
        where: {
            UserID: id
        }
    });
    res.json(user);
}

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const {username, password} = req.body;
    await db.user.update({
        where:{
            UserID: id
        },
        data: {
            Username: username,
            Password: password,
        }
    });
    res.json({
        message: 'OK'
    });
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    await db.user.delete({
        where: {
            UserID: id
        }
    });
    res.json({
        message: 'OK'
    });
}