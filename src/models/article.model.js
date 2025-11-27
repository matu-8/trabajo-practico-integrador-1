// 4. Article (Artículo)
// ● id (Primary Key, auto increment)
// ● title (VARCHAR(200), 3-200 caracteres)
// ● content (TEXT, mínimo 50 caracteres)
// ● excerpt (VARCHAR(500), resumen corto, opcional)
// ● status (ENUM: 'published', 'archived', default: published)
// ● user_id (Foreign Key → User) relacion
// ● created_at
// ● updated_at

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ArticleModel = sequelize.define(
    'article',{

        title:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        excerpt:{
            type:DataTypes.STRING(500),
        },
        status:{
            type:DataTypes.ENUM('published','archived'),
            defaultValue:'published'
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },
    {
        timestamps:true
    });
    
//relacion 1:M

UserModel.hasMany(ArticleModel,{
    foreignKey:"user_id",
    as:"articles"
    })

ArticleModel.belongsTo(UserModel,{
    foreignKey:"user_id",
    as:"author"
    })