import { Router } from "express";
import { createTicket, getTickets } from "../controllers/tickets";
import { isAuth } from "../middlewares/is-auth";

const router = Router();

router.put("/create", isAuth, createTicket);
router.get("/list", isAuth, getTickets);

export default router;