import { Request, Response } from "express";
import db from "../db";

const getFields = (req: Request)=> {
    const { idUsuario, titulo, idTipoPublicacion, texto, idPostCompartido}:
    {idUsuario: number; titulo: string, idTipoPublicacion: number,
     texto: string, idPostCompartido: number} = req.body;
    return {
        cveUser: idUsuario,
        TitlePost: titulo,
        cveTypePublicacion: idTipoPublicacion,
        TextPost: texto,
        idPostCompartido: idPostCompartido
    };
}

export const createPost = async (req: Request, res: Response) => {
    const data = {
        ...getFields(req),
        ...{FechaDePublicacion: new Date()}
    };
    await db.posts.create({ data });
    res.json({
        message: 'OK'
    });
};

export const getPosts = async (req: Request, res: Response) => {
    const posts = await db.posts.findMany();
    res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const post = await db.posts.findUnique({
        where: {
            IdArticulos: id
        }
    });
    res.json(post);
}

export const updatePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const data = getFields(req);
    await db.posts.update({
        where:{
            IdArticulos: id
        },
        data
    });
    res.json({
        message: 'OK'
    });
}

export const deletePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    await db.posts.delete({
        where: {
            IdArticulos: id
        }
    });
    res.json({
        message: 'OK'
    });
}