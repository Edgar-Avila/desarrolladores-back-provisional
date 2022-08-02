import { Request, Response } from "express";
import db from "../db";

export const createProgrammingLanguage = async (req: Request, res: Response) => {
    const {name} = req.body;
    await db.programmingLanguage.create({
        data: {
            Name: name
        }
    });
    res.json({
        message: 'OK'
    });
};

export const getProgrammingLanguages = async (req: Request, res: Response) => {
    const programmingLanguages = await db.programmingLanguage.findMany();
    res.json(programmingLanguages);
};

export const getProgrammingLanguage = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const programmingLanguages = await db.programmingLanguage.findUnique({
        where: {
            LanguageID: id
        }
    });
    res.json(programmingLanguages);
}

export const updateProgrammingLanguage = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    const {name} = req.body;
    await db.programmingLanguage.update({
        where:{
            LanguageID: id
        },
        data: {
            Name: name,
        }
    });
    res.json({
        message: 'OK'
    });
}

export const deleteProgrammingLanguage = async (req: Request, res: Response) => {
    const id = parseInt(req.params['id']);
    await db.programmingLanguage.delete({
        where: {
            LanguageID: id
        }
    });
    res.json({
        message: 'OK'
    });
}