import { Router } from "express";
import { addCity, getCities } from "../controllers/cities";

const router = Router();

router.get("/list", getCities);
router.get("/list", addCity);

export default router;