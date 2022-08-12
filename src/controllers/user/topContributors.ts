import { Request, Response } from "express";
import db from "../../db";
import { isPositiveInt } from "../../util";

export const topContributors = async (req: Request, res: Response) => {
    // Get number and validate it
    const num = req.params['number'];
    if (!isPositiveInt(num)) {
        return res.sendStatus(400);
    }

    // Select top contributors
    const users = await db.user.findMany({
        select: {
            _count: {
                select: { Post: true },
            },
            UserID: true,
            Username: true,
            ProfilePictureUrl: true
        },
        orderBy: {
            Post: {
                _count: 'desc'
            }
        },
        take: Number(num)
    });

    // Rename so that count is easier to access
    const mappedUsers = users.map((user) => {
        return {
            UserID: user.UserID,
            ProfilePictureUrl: user.ProfilePictureUrl,
            Username: user.Username,
            PostCount: user._count.Post
        }
    });

    // Send data
    res.json(mappedUsers);
}