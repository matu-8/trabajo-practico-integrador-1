// 5. Tag (Etiqueta)
// ● id (Primary Key, auto increment)
// ● name (VARCHAR(30), único, 2-30 caracteres)
// ● created_at
// ● updated_at

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ArticleModel } from "./article.model.js";
import { articleTag } from "./articleTag.model.js";

export const tagModel = sequelize.define(
    'tag',{
        name:{
            type:DataTypes.STRING(30),
            unique:true
        },
    });
    

    //relacion N:M
ArticleModel.belongsToMany(tagModel, 
    {through: articleTag})
tagModel.belongsToMany(ArticleModel,
    {through: articleTag})