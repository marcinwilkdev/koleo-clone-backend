import { Router } from "express";
import { body } from "express-validator";

import {
    createTicket,
    getTickets,
    getTicketsCount,
} from "../controllers/tickets";

import { isAuth } from "../middlewares/is-auth";

const router = Router();

router.put(
    "/create",
    isAuth,
    [
        body("arrivalCity").trim().notEmpty(),
        body("departureCity").trim().notEmpty(),
        body("id").trim().notEmpty(),
    ],
    createTicket
);
router.get("/list", isAuth, getTickets);
router.get("/count", isAuth, getTicketsCount);

export default router;
