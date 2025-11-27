import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { Op } from "sequelize";

//Creacion de usuario
export const createUserValidation = [
    body("username")
        .notEmpty()
        .withMessage("El campo debe estar completo")
        .isString()
        .withMessage("El nombre de usuario debe contener solo letras y numeros")
        .trim()
        .isLength({min:3, max:20})
        .withMessage("El nombre de usuario no debe tener menos de 3 y mas de 20 caracteres")
        .custom(async value =>{
            const uniqueUsername = await UserModel.findOne({
                where:{username:value}
            });
            if(!uniqueUsername){
                return true;
            }
            throw new Error(`Este nombre de usuario ya está en uso`)
        }),
 
    body("email")
        .notEmpty()
        .withMessage("El campo debe ser completado")
        .trim()
        .isEmail()
        .withMessage("El formato del email no es valido")
        .custom(async (value) => {
        const email = await UserModel.findOne({
            where:{email:value}
        })
        if(!email){
            return true;
        }
        throw new Error("El email ingresado ya existe")
    }),

    body("password").trim()
        .notEmpty()
        .withMessage("El capo no puede ser vacio")
        .matches(/^[a-zA-Z0-9]{8,20}$/)
        .withMessage("La contraseña debe contener letras mayusculas, minusculas y numeros"),

    body("role").trim()
        .notEmpty().withMessage("Debe completar este campo")
        .isIn(["user","admin"]).withMessage("El rol tiene solo dos opciones disponibles")
]

//Usuario por ID
export const getUserById = [
    param("id")
    .isInt({min:1})
    .withMessage("El identificador debe ser un numero entero")
    .custom(async(value)=>{
        const user = await UserModel.findByPk(value)
        if(!user){
            throw new Error("No se encontró el usuario")
        }
        return true;
    })
]

export const updateUserValidation = [
    param("id").notEmpty()
   .trim()
   .custom(async value => {
        const user = await UserModel.findByPk(value)
        if(!user){
        throw new Error("No se ha encontrado el usuario")
        }
        return true;
   }),

    body("username")
    .optional()
    .trim()
    .isString().withMessage("El nombre de usuario debe contener solo letras y numero"),

   //Controlando email
   body("email")
   .optional()
   .isEmail()
   .withMessage("Ingrese una direccion de mail valida")
   .custom(async (value, {req}) => {
    const searchEmail = await UserModel.findOne({
        where:
        {
            email: req.body.email,
            id: {[Op.ne]: req.params.id}
        }
    });
    if(searchEmail == req.body.email){
        throw new Error("El email ingresado ya existe")
        }
        return true;
   }),
   
    body("password").optional()
    .trim()
    .matches(/^[a-zA-Z0-9]{8,20}$/)
    .withMessage("La contraseña debe contener letras mayúsculas, minúsculas, numeros y como minimo 8 caracteres")
]

export const deleteUserValidation = [
    param("id")
    .notEmpty()
    .withMessage("El campo debe ser completado")
    .isNumeric()
    .withMessage("El id debe ser solo numeros")
    .isInt()
    .withMessage("El id debe ser un numero entero")
    .custom(async(value)=>{
        const user = await UserModel.findByPk('id')
        if(user.length == 0){
            throw new({msg:'No se econtro el usuario'})
        }
        return true;
    })
]
