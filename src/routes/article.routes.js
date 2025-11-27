import { Router } from "express";
import { createArticleValidation, updateArticleValidator } from "../middleware/validations/articleValidator.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createArticle, getArticleById, getArticlesByUser, getArticlesByUserId, updateArticles } from "../controllers/article.controller.js";
import { results } from "../middleware/validator.js";
import { getAllArticles } from "../controllers/article.controller.js";
import { ownerMiddleware } from "../middleware/ownerMiddleware.js";


export const ArticleRouter = Router()

ArticleRouter.use(authMiddleware) //Se llama de esta forma porque, en este endpoint, se ocupa en todas las rutas, por lo tanto, se lo llama siempre

ArticleRouter.get('/article', getAllArticles)
ArticleRouter.get('/article/user', getArticlesByUser)
ArticleRouter.get('/article/:id', getArticleById)
ArticleRouter.get('/article/user/:id', getArticlesByUserId )
ArticleRouter.post('/article', createArticleValidation, results, createArticle);
ArticleRouter.put('/article/:id', ownerMiddleware, updateArticleValidator, results, updateArticles)
// ArticleRouter.delete('/article',)