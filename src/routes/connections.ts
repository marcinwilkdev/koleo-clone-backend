import { Router } from "express";
import { addConnection, findConnections } from "../controllers/connections";
import { optionalAuth } from "../middlewares/optional-auth";

const router = Router();

router.put("/add", addConnection);
router.get("/find", optionalAuth, findConnections);

export default router;
