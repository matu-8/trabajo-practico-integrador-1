import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const articleTag = sequelize.define(
    'articleTag', {
        article_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true
        },
          tag_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true
        }
    });