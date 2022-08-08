import { NextFunction, Request, Response } from "express";

export const credentials = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.origin == process.env.CLIENT_URL){
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    next();
}