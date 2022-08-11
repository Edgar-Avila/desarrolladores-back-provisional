import { Request, Response } from "express";
import db from "../../db";
import bcrypt from 'bcrypt';
import { Prisma } from "@prisma/client";

export const register = async (req: Request, res: Response) => {
    // Grab username, password and email from req.body
    const {username, password} : 
    {username: string, password: string} = req.body;
    if(!username || !password){
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }
    try {
        // Hash the password
        const hashed = await bcrypt.hash(password, 10);

        // Store in database
        await db.user.create({
            data: {
                Username: username,
                Password: hashed,
            }
        });
        res.status(201).json({'message': `New user ${username} created`});
    } 
    catch (err) {
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            // Unique constraint error on username
            if (err.code === 'P2002') {
                res.sendStatus(409);
            }
        }
        else if (err instanceof Error) {
            // Other errors
            res.status(500).json({
                message: err.message
            });
        }
    }
}
