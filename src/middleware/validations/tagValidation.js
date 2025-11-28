import { body, param } from "express-validator";
import { tagModel } from "../../models/tag.model.js";
// Validaciones para crear un tag
export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    
    .matches(/^[^\s]+$/)
    .withMessage("El nombre no debe contener espacios")
    
    .custom(async (value) => {
      const tagExists = await tagModel.findOne({ 
        where: { name: value } 
      });
      
      if (tagExists) {
        throw new Error("El nombre del tag ya existe, debe ser único");
      }
      
      return true;
    })
];

// Validaciones para obtener tag por ID
export const getTagByIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El identificador debe ser un número entero")
    
    .custom(async (value) => {
      const tag = await tagModel.findByPk(value);
      
      if (!tag) {
        throw new Error("No se encontró el tag");
      }
      
      return true;
    })
];

// Validaciones para actualizar un tag
export const updateTagValidation = [
  param("id")
    .notEmpty()
    .withMessage("Falta agregar el número de id")
    
    .isInt({ min: 1 })
    .withMessage("El identificador debe ser un número mayor que cero")
    
    .custom(async (value) => {
      const tag = await tagModel.findByPk(value);
      
      if (!tag) {
        throw new Error("No se encontró el tag");
      }
      
      return true;
    }),

  body("name")
    .optional()
    .trim()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    
    .matches(/^[^\s]+$/)
    .withMessage("El nombre no debe contener espacios")
    
    .custom(async (value, { req }) => {
      const tagId = req.params.id;
      
      const tagExists = await tagModel.findOne({ 
        where: { name: value } 
      });
      
      // Si existe un tag con ese nombre Y no es el mismo que estamos actualizando
      if (tagExists && tagExists.id != tagId) {
        throw new Error("El nombre del tag ya existe, debe ser único");
      }
      
      return true;
    })
];

// Validaciones para eliminar un tag
export const deleteTagValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id del tag debe ser un número entero")
    
    .custom(async (value) => {
      const tag = await tagModel.findByPk(value);
      
      if (!tag) {
        throw new Error("No se encontró el tag");
      }
      
      return true;
    })
];
