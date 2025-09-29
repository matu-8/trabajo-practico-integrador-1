import { body } from "express-validator";

export const loginValidation = [
    body("username")
        .notEmpty().withMessage("El nombre de usuario es requerido")
        .trim()
        .isString().withMessage("El nombre de usuario deber sert una cadena de caracteres"),
    body("password")
    .notEmpty().withMessage("La contrasena es requerida")
    .trim()
    .isAlphanumeric()
    .matches(/^[a-zA-Z0-9]+$/)
]