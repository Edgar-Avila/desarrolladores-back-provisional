import { Request, Response } from "express";
import db from "../db";

export const createPostType = async (req: Request, res: Response) => {
    const {nombre, idLenguaje}: {nombre: string; idLenguaje: number} = req.body;
    await db.type_Publicacion.create({
        data: {
            NomTypePost: nombre,
            cveLanguage: idLenguaje,
        }
    });
    res.json({
        message: 'OK'
    });
};

export const getPostTypes = async (req: Request, res: Response) => {
    const postTypes = await db.type_Publicacion.findMany();
    res.json(postTypes);
};

export const getPostType = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const postType = await db.type_Publicacion.findUnique({
        where: {
            IdTypePost: id
        }
    });
    res.json(postType);
}

export const updatePostType = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const {nombre, idLenguaje}: {nombre: string; idLenguaje: number} = req.body;
    await db.type_Publicacion.update({
        where:{
            IdTypePost: id
        },
        data: {
            NomTypePost: nombre,
            cveLanguage: idLenguaje,
        }
    });
    res.json({
        message: 'OK'
    });
}

export const deletePostType = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    await db.type_Publicacion.delete({
        where: {
            IdTypePost: id
        }
    });
    res.json({
        message: 'OK'
    });
}