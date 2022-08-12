import { Request, Response } from "express";
import db from "../../db";
import { isPositiveInt } from "../../util";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const updateUser = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const { username, password } = req.body;

    // Check all
    if (!isPositiveInt(userId)) {
        return res.sendStatus(400);
    }
    if (((typeof username != "string") && (typeof username != "undefined")) ||
        ((typeof password != "string") && (typeof password != "undefined"))) {
        return res.sendStatus(400);
    }

    // Encrypt password
    let hashed: undefined | string = undefined;
    if(typeof password == "string"){
        hashed = await bcrypt.hash(password, 10);
    }

    // Update db
    try{
        await db.user.update({
            where: {
                UserID: Number(userId)
            },
            data: {
                Username: username,
                Password: hashed,
            }
        });
        res.sendStatus(200);
    }
    catch(err){
        if(err instanceof PrismaClientKnownRequestError){
            // Unique constraint error on username
            if (err.code === 'P2002') {
                res.sendStatus(409);
            }
        }
        res.sendStatus(500);
    }
}