import { Router } from "express";
import { body } from "express-validator";

import UserService from "../services/database/UserService";

import { getData, setData, signin, signup } from "../controllers/auth";

import { isAuth } from "../middlewares/is-auth";

const router = Router();

router.put(
    "/signup",
    [
        body("email")
            .isEmail()
            .custom(async (value, { req }) => {
                const user = await UserService.getInstance().findByEmail(value);

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
router.put("/set-data", isAuth, [
    body("discount").trim().custom((value, {req}) => {
        if(value !== "true" && value !== "false") {
            return false;
        }

        return true;
    }),
    body("firstName").trim().notEmpty(),
    body("lastName").trim().notEmpty(),
    body("dateOfBirth").isDate(),
], setData);
router.get("/get-data", isAuth, getData);

export default router;
