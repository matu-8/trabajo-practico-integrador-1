//Archivo para centralizar rutas
import { Router } from "express";
import { authRoute } from "./auth.routes.js";
import { ProfileRouter } from "./profile.routes.js";
import { ArticleRouter } from "./article.routes.js";

export const routes = Router();

routes.use(authRoute);
routes.use(ProfileRouter);
routes.use(ArticleRouter);
routes.use(article)

