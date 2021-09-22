import { Router } from "express";
import { body } from "express-validator";
import { userService } from "../app";

import { setData, signin, signup } from "../controllers/auth";

import { isAuth } from "../middlewares/is-auth";

const router = Router();

router.put(
    "/signup",
    [
        body("email")
            .isEmail()
            .custom(async (value, { req }) => {
                const user = await userService.findByEmail(value);

                if (user) {
                    throw Error(
                        "User with this e-mail address already exists."
                    );
                }

                return true;
            })
            .normalizeEmail(),
        body("password").trim().isLength({ min: 8 }),
        body("confirmPassword")
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords don't match.");
                }

                return true;
            }),
    ],
    signup
);
router.post("/signin", signin);
router.put("/set-data", isAuth, setData);

export default router;
