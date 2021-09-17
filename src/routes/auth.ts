import { Router } from "express";
import { signin, signup } from "../controllers/auth";

import { body } from "express-validator";

const router = Router();

router.put("/signup", signup);
router.post("/signin", signin);

export default router;