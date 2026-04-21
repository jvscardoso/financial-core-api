import { Router } from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import { transactionRoutes } from "./modules/transaction/transaction.routes";
import { userRoutes } from "./modules/user/user.routes";


export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/transactions", transactionRoutes);
routes.use("/users", userRoutes);