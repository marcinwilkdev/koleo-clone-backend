import { Router } from "express";
import { createTicket } from "../controllers/tickets";

const router = Router();

router.put("/create", createTicket);

export default router;