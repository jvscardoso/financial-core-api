import { Router } from "express";
import { me, update } from "./user.controller";
import { authMiddleware } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { updateUserSchema } from "./user.schema";

const router = Router();

router.use(authMiddleware);

router.get("/me", me);
router.put("/me", validate(updateUserSchema), update);

export { router as userRoutes };