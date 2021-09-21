import { Router } from "express";
import { createTicket, getTickets, getTicketsCount } from "../controllers/tickets";
import { isAuth } from "../middlewares/is-auth";

const router = Router();

router.put("/create", isAuth, createTicket);
router.get("/list", isAuth, getTickets);
router.get("/count", isAuth, getTicketsCount);

export default router;