import { Router } from "express";

import { isAuth } from "../middlewares/is-auth";

import { createTicket, getTickets, getTicketsCount } from "../controllers/tickets";

const router = Router();

router.put("/create", isAuth, createTicket);
router.get("/list", isAuth, getTickets);
router.get("/count", isAuth, getTicketsCount);

export default router;