import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";

export const createProfileValidation = [
       //validando nombre
    body("first_name").trim()
       .notEmpty().withMessage("El campo debe ser completado")
       .isString().withMessage("El campo debe ser completado")
       .isLength({min:5, max:50}),

       //validando apellido
    body("last_name").trim()
       .notEmpty().withMessage("El campo debe ser completado")
       .isString().withMessage("El campo debe ser completado")
       .isLength({min:5, max:50}),

       //validando fecha de cumpleaños
    body("birth_date")
        .optional()
        .isDate().withMessage("Formato de la fecha debe ser válida (YYYY/MM/DD)"),
    
       //validando url de avatar
    body("avatar_url")
        .optional()
        .isURL().withMessage("El formato de la url no es válido"),

       //validando biografia
    body("biography")
        .optional()
        .trim()
        .isLength({max:500}).withMessage("El maximo es de 500 caracteres") 
]

export const getProfileByIdValidation = [
    param("id")
    .isInt({min:1})
    .withMessage("El identificador debe ser un numero entero")
    .custom(async(value)=>{
        const profile = await ProfileModel.findByPk(value)
        if(!profile){
            throw new Error("No se encontró el perfil")
        }
        return true;
    })
]

export const deleteProfileValidation = [
    param("id")
    .notEmpty()
    .withMessage("El campo debe ser completado")
    .isNumeric()
    .withMessage("El id debe ser solo numeros")
    .isInt({min:1})
    .withMessage("El id debe ser un numero entero")
    .custom(async value => {
        const profile = ProfileModel.findByPk(value)
        if(!profile){
            throw new Error("No es ha encontrado el perfil")
        }
        return true;
    })
]

export const updateProfileValidation = [
    param("id")
    .isInt({min:1})
    .withMessage("El identificador debe ser un numero entero mayor a cero")
    .custom(async value => {
        const profile = ProfileModel.findByPk(value)
        if(!profile){
            throw new Error("No se ha encontrado el perfil")
        }
        return true;
        }
    ),
       //validando nombre
    body("first_name")
        .trim()
       .optional()
       .isString()
       .withMessage("El campo debe ser completado")
       .isLength({min:5, max:50}),

       //validando apellido
    body("last_name")
        .trim()
       .optional()
       .isString()
       .isLength({min:5, max:50}),

       //validando fecha de cumpleaños
    body("birth_date")
        .optional()
        .isDate()
        .withMessage("Formato de la fecha debe ser válida (AA-MM-DD)"),

       //validando url de avatar
    body("avatar_url")
        .optional()
        .isURL().withMessage("El formato de la url no es válido"),

       //validando biografia
    body("biography")
        .optional()
        .trim()
        .isLength({max:500}).withMessage("El maximo es de 500 caracteres") 

]