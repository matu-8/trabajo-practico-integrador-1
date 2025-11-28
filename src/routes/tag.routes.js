import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagsById, updateTag } from "../controllers/tag.controller.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { createTagValidation, deleteTagValidation, getTagByIdValidation, updateTagValidation } from "../middleware/validations/tagValidation.js";
import { results } from "../middleware/validator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const TagRouter = Router()

TagRouter.use(authMiddleware)

TagRouter.post('/tag', adminMiddleware, createTagValidation, results, createTag )
TagRouter.get('/tag', adminMiddleware, getAllTags)
TagRouter.get('/tag/:id', adminMiddleware, getTagByIdValidation, getTagsById)
TagRouter.put('/tag/:id', adminMiddleware, updateTagValidation, updateTag)
TagRouter.delete('/tag/:id', adminMiddleware, deleteTagValidation, deleteTag)