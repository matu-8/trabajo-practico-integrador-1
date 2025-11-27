//En estos middelewares se realizan las validaciones para todos los campos
// de los modelos, dichos middlewares se colocan luego de verificar si estan autenticados

import { ArticleModel } from "../../models/article.model.js";
import { body, param } from "express-validator";

export const createArticleValidation = [
  
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El campo no puede ser vacio")
    .isString()
    .withMessage("El titulo debe contener caracteres y numeros")
    .isLength({ min: 3, max: 300 }),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("El campo debe ser completado")
    .isLength({ min: 50 })
    .withMessage("El campo no debe tener menos de 50 caracteres"),

  body("excerpt")
    .trim()
    .isString()
    .withMessage("El extracto solo puede contener letras y numeros")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El maximo de caracteres permitidos es de 500"),

  body("status")
    .trim()
    .isString()
    .withMessage("Seleccione solo las opciones disponibles")
    .isIn(["published", "archived"])
    .withMessage("El estado tiene solo dos opciones disponibles"),
];

export const getArticleByIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El identificador debe ser un numero entero")
    .custom(async (value) => {
      const article = await ArticleModel.findByPk(value);
      if (!article) {
        throw new Error("No se encontró el articulo");
      }
      return true;
    }),
];

export const updateArticleValidator = [
  param("id")
    .notEmpty()
    .withMessage("Falta agregar agregar el numero de id")
    .isInt({ min: 1 })
    .withMessage("El identificador debe ser un numero mayor que cero"),
  body("title")
    .optional()
    .isString()
    .withMessage("El titulo debe contener solo letras y numeros")
    .isLength({ min: 3, max: 200 })
    .withMessage(
      "El titulo no debe sobrepasar los 200 caracteres y poseer menos de 3 caracteres"
    ),

  body("content")
    .optional()
    .isString()
    .withMessage("El contenido debe tener solo letras y numeros")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener como minimo 50 caracteres"),

  body("excerpt")
    .optional()
    .isString()
    .withMessage("El extracto debe tenersolo letras y numeros")
    .isLength({ max: 500 })
    .withMessage("EL extracto no debe sobrepasar los 500 caracteres"),

  body("status").optional()
];
