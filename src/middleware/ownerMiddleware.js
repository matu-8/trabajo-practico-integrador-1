import { ArticleModel } from "../models/article.model.js";

export const ownerMiddleware = async(req, res, next)=>{
    const {id} = req.user;
    const articleId = req.params.id
    try {
        const article = await ArticleModel.findByPk(articleId)
        if(!article) {
            return res.status(404).json({msg:'No se ha encontrado el articulo'})
        } else if(id == article.user_id){
            req.targetArticle = article //creo un nuevo campo en el objeto de request, donde guardo la informacion de article.
            next()
        } else{
            res.status(403).json({msg: "No autorizado"})
        }
        
    } catch (error) {
        res.status(500).json({error: "Error interno del server"})
    }
}