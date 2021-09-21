import { Router } from "express";
import { addCity, getCities } from "../controllers/cities";

const router = Router();

router.get("/list", getCities);
router.put("/add", addCity);

export default router;