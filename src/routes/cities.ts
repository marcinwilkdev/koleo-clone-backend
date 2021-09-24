import { Router } from "express";
import { body } from "express-validator";

import { addCity, getCities } from "../controllers/cities";
import { isAdmin } from "../middlewares/is-admin";
import { isAuth } from "../middlewares/is-auth";

const router = Router();

router.get("/list", getCities);
router.put("/add", isAuth, isAdmin, body("name").notEmpty(), addCity);

export default router;
