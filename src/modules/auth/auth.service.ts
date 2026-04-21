import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

export async function register({ email, password, name }) {
    const userExists = await prisma.user.findUnique({
        where: { email },
    });

    if (userExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
}

export async function login({ email, password }) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { sub: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );

    return { user, token };
}