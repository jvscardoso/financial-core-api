import { Router } from "express";
import { create, list, remove } from "./transaction.controller";
import { authMiddleware } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { createTransactionSchema } from "./transaction.schema";

const router = Router();

router.use(authMiddleware);

router.post("/", validate(createTransactionSchema), create);
router.get("/", list);
router.delete("/:id", remove);

export { router as transactionRoutes };