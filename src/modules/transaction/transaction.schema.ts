import { z } from "zod";

export const createTransactionSchema = z.object({
    description: z.string().min(1),
    amount: z.number().positive(),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.string().min(1),

    status: z.enum(["PENDING", "PAID", "OVERDUE"]),
    paymentMethod: z.enum(["PIX", "CREDIT_CARD", "CASH", "BOLETO"]).optional(),

    transactionDate: z.string().datetime(),

    installments: z.number().int().min(1).optional(),
});