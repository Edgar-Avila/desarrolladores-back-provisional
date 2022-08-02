import { Request, Response } from "express";
import db from "../db";

export const createUser = async (req: Request, res: Response) => {
    const {nombre, email, password} = req.body;
    await db.usuarios.create({
        data: {
            NomUsuario: nombre,
            CorreoUsuario: email,
            PasswordUsuario: password,
            FechaAgregacion: new Date()
        }
    });
    res.json({
        message: 'OK'
    });
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await db.usuarios.findMany();
    res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const user = await db.usuarios.findUnique({
        where: {
            IdUsuario: id
        }
    });
    res.json(user);
}

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const {nombre, email, password} = req.body;
    await db.usuarios.update({
        where:{
            IdUsuario: id
        },
        data: {
            NomUsuario: nombre,
            CorreoUsuario: email,
            PasswordUsuario: password,
        }
    });
    res.json({
        message: 'OK'
    });
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const user = await db.usuarios.delete({
        where: {
            IdUsuario: id
        }
    });
    res.json({
        message: 'OK'
    });
}