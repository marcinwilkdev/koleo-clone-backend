import { Router } from "express";
import { signin, signup } from "../controllers/auth";

const router = Router();

router.put("/signup", signup);
router.post("/signin", signin);

export default router;