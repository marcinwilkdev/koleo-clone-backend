import { Router } from "express";
import { createTicket } from "../controllers/tickets";
import { isAuth } from "../middlewares/is-auth";

const router = Router();

router.put("/create", isAuth, createTicket);

export default router;