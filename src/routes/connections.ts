import { Router } from "express";
import { addConnection, findConnections } from "../controllers/connections";

const router = Router();

router.put("/add", addConnection);
router.get("/find", findConnections);

export default router;