import { Router } from "express";
import { addConnection, findConnections } from "../controllers/connections";
import { isAdmin } from "../middlewares/is-admin";
import { isAuth } from "../middlewares/is-auth";
import { optionalAuth } from "../middlewares/optional-auth";

const router = Router();

router.put("/add", isAuth, isAdmin, addConnection);
router.get("/find", optionalAuth, findConnections);

export default router;
