import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

export async function getMe(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function updateUser(userId: string, data: any) {
    const updateData: any = { ...data };

    if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
        where: { id: userId },
        data: updateData,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}