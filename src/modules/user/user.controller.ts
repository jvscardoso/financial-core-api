import { Request, Response } from "express";
import * as UserService from "./user.service";

export async function me(req: Request, res: Response) {
    try {
        const user = await UserService.getMe(req.userId);
        return res.json(user);
    } catch (err: any) {
        return res.status(404).json({ error: err.message });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const user = await UserService.updateUser(req.userId, req.body);
        return res.json(user);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}