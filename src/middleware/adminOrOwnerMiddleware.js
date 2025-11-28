import { ArticleModel } from "../models/article.model.js";

export const adminOrOwnerMiddlware = async(req, res, next)=>{
    try {
        const {role, id} = req.user; //traigo rol y id del usuario 
        const articleId = req.params.id;
        const article = await ArticleModel.findOne({where:{id:articleId}})
        if(!article){
            return res.status(404).json({msg:'No se ha encontrado el articulo'})
        }

        if(role == "admin" || id == article.user_id){
            return next();
        }
        res.status(403).json({msg:'No esta autorizado a eliminar el recurso'})
    } catch (error) {
        console.log('>>> ! Ha ocurrido un error en adminOrOwnerMiddlware')
        res.status(500).json({msg:'Error interno de servidor'})
    }
}