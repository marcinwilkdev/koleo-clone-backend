import { Router } from "express";
import { body } from "express-validator";
import { addConnection, findConnections } from "../controllers/connections";
import { isAdmin } from "../middlewares/is-admin";
import { isAuth } from "../middlewares/is-auth";
import { optionalAuth } from "../middlewares/optional-auth";

const router = Router();

router.put(
    "/add",
    isAuth,
    isAdmin,
    [
        body("cities").custom((value, { req }) => {
            if (value.length < 2) {
                return false;
            }
            return true;
        }),
        body("trainType").notEmpty(),
    ],
    addConnection
);
router.get("/find", optionalAuth, findConnections);

export default router;
