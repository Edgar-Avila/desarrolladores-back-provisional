import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserPayload } from '../types/jwt';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
        if(err){
            console.log(err);
            return res.sendStatus(401);
        }
        const decodedObject = decoded as UserPayload;
        res.locals.user = decodedObject.username;
        res.locals.userId = decodedObject.id;
        next();
    });
}

export default verifyJWT;