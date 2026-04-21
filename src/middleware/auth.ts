import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token missing" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        req.userId = decoded.sub;

        return next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}