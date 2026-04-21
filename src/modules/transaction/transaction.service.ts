import { prisma } from "../../lib/prisma";

export async function createTransaction(data: any, userId: string) {
    const {
        installments = 1,
        transactionDate,
        ...rest
    } = data;

    // 🔥 regra de negócio
    if (
        installments > 1 &&
        (data.type !== "EXPENSE" || data.paymentMethod !== "CREDIT_CARD")
    ) {
        throw new Error("Installments only allowed for credit card expenses");
    }

    const transaction = await prisma.transaction.create({
        data: {
            ...rest,
            transactionDate: new Date(transactionDate),
            userId,
        },
    });

    // 🧩 sempre cria ao menos 1 parcela
    if (installments === 1) {
        await prisma.installment.create({
            data: {
                amount: data.amount,
                installmentNumber: 1,
                totalInstallments: 1,
                dueDate: new Date(transactionDate),
                transactionId: transaction.id,
            },
        });

        return transaction;
    }

    // 💳 parcelamento
    const installmentValue = data.amount / installments;
    const baseDate = new Date(transactionDate);

    const installmentsData = [];

    for (let i = 1; i <= installments; i++) {
        const dueDate = new Date(baseDate);
        dueDate.setMonth(baseDate.getMonth() + (i - 1));

        installmentsData.push({
            amount: Number(installmentValue.toFixed(2)),
            installmentNumber: i,
            totalInstallments: installments,
            dueDate,
            transactionId: transaction.id,
        });
    }

    await prisma.installment.createMany({
        data: installmentsData,
    });

    return transaction;
}

export async function listTransactions(userId: string) {
    return prisma.transaction.findMany({
        where: { userId },
        include: {
            installments: true,
        },
        orderBy: { transactionDate: "desc" },
    });
}

export async function deleteTransaction(id: string, userId: string) {
    const transaction = await prisma.transaction.findFirst({
        where: { id, userId },
    });

    if (!transaction) {
        throw new Error("Transaction not found");
    }

    await prisma.installment.deleteMany({
        where: { transactionId: id },
    });

    await prisma.transaction.delete({
        where: { id },
    });
}