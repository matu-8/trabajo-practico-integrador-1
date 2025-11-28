import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ArticleModel } from "./article.model.js";
import { articleTag } from "./articleTag.model.js";

export const tagModel = sequelize.define(
  "tag",
  {
    name: {
      type: DataTypes.STRING(30),
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

//relacion N:M
ArticleModel.belongsToMany(tagModel, {
  through: articleTag,
  foreignKey: "article_id",
  as: "articles",
});

tagModel.belongsToMany(ArticleModel, {
  through: articleTag,
  foreignKey: "tag_id",
  as: "tags",
});

