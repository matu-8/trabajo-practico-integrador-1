import { Router } from "express";
import { createArticleValidation } from "../middleware/validations/articleValidator.js";

export const ArticleRouter = Router()

ArticleRouter.get('/article',)
ArticleRouter.get('/article',)
ArticleRouter.post('/article',createArticleValidation)
ArticleRouter.put('/article',)
ArticleRouter.delete('/article',)