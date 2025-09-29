import { Router } from "express";
import { createUserValidation } from "../middleware/validations/userValidator.js";
import { createProfileValidation } from "../middleware/validations/profileValidation.js";
import { Results } from "../middleware/validator.js";
import { login, register } from "../controllers/auth.controller.js";
import { loginValidation } from "../middleware/validations/loginValidation.js";
export const authRoute = Router();

authRoute.post("/auth/register",
    createProfileValidation,
    createUserValidation,
    Results,
    register
);
authRoute.post("/auth/login",
    loginValidation,
    Results,
    login
);