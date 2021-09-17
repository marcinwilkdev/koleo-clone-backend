import { Router } from "express";
import { signin, singup } from "../controllers/auth";

const router = Router();

router.put("/signup", singup);
router.post("/signin", signin);

export default router;