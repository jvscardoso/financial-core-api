import { Request, Response } from "express";
import * as TransactionService from "./transaction.service";

export async function create(req: Request, res: Response) {
    try {
        const transaction = await TransactionService.createTransaction(
            req.body,
            req.userId
        );

        return res.status(201).json(transaction);
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}

export async function list(req: Request, res: Response) {
    const data = await TransactionService.listTransactions(req.userId);
    return res.json(data);
}

export async function remove(req: Request, res: Response) {
    try {
        await TransactionService.deleteTransaction(
            req.params.id,
            req.userId
        );

        return res.status(204).send();
    } catch (err: any) {
        return res.status(404).json({ error: err.message });
    }
}