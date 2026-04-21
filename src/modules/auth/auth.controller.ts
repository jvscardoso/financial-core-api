import { Request, Response } from "express";
import * as AuthService from "./auth.service";

export async function register(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

        const user = await AuthService.register({ email, password, name });

        return res.status(201).json(user);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const data = await AuthService.login({ email, password });

        return res.json(data);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}