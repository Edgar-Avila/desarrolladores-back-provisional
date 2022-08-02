import { Request, Response } from "express";
import db from "../db";

export const createProgrammingLanguage = async (req: Request, res: Response) => {
    const {nombre} = req.body;
    await db.programming_Languages.create({
        data: {
            'NomLanguage': nombre
        }
    });
    res.json({
        message: 'OK'
    });
};

export const getProgrammingLanguages = async (req: Request, res: Response) => {
    const programmingLanguages = await db.programming_Languages.findMany();
    res.json(programmingLanguages);
};

export const getProgrammingLanguage = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const programmingLanguages = await db.programming_Languages.findUnique({
        where: {
            IdLanguage: id
        }
    });
    res.json(programmingLanguages);
}

export const updateProgrammingLanguage = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const {nombre} = req.body;
    await db.programming_Languages.update({
        where:{
            IdLanguage: id
        },
        data: {
            NomLanguage: nombre,
        }
    });
    res.json({
        message: 'OK'
    });
}

export const deleteProgrammingLanguage = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    await db.programming_Languages.delete({
        where: {
            IdLanguage: id
        }
    });
    res.json({
        message: 'OK'
    });
}