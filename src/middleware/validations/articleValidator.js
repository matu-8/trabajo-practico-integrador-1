//En estos middelewares se realizan Se realizan las validaciones para todos los campos
// de los modelos, dichos middlewares se colocan luego de vereficar si estan autenticados 

import { articleModel } from "../../models/article.model.js";
import { body, param } from "express-validator";

export const createArticle = [
    param("id").trim()
    .isInt().withMessage("El identificador debe ser un numero entero"),

    body("title").trim()
        .notEmpty().withMessage("El campo no puede ser vacio")
        .isString().withMessage("El titulo debe contener caracteres y numeros")
        .length({min:3, max:300}),

    body("content").trim()
        .notEmpty().withMessage("El campo debe ser completado")
        .length({min:50}).withMessage("El campo no debe tener menos de 50 caracteres"),

    body("excerpt").trim()
        .isString().withMessage("El extracto solo puede contener letras y numeros")
        .optional()
        .length({max:500}).withMessage("El maximo de caracteres permitidos es de 500"),

    body("status").trim()
    .isString().withMessage("Seleccione solo las opciones disponibles")
    .isIn(["published","archived"]).withMessage("El estado tiene solo dos opciones disponibles")
]

export const getArticleById = [
    param("id")
    .isInt({min:1})
    .withMessage("El identificador debe ser un numero entero")
    .custom(async(value)=>{
        const article = await articleModel.findByPk(value)
        if(!article){
            throw new Error("No se encontró el article")
        }
        return true;
    })
]



