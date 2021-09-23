import { Router } from "express";
import { addConnection } from "../controllers/connections";

const router = Router();

router.put("/add", addConnection);

export default router;