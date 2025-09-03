import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const articleTag = sequelize.define(
    'articleTag', {
        article_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
          tag_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    });