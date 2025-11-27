// 1. User (Usuario)
// ● id (Primary Key, auto increment)
// ● username (VARCHAR(20), único, 3-20 caracteres)
// ● email (VARCHAR(100), único, formato válido)
// ● password (VARCHAR(255), hasheada con bcrypt)
// ● role (ENUM: 'user', 'admin', default: 'user')
// ● created_at
// ● updated_at
// ● deleted_at (para eliminación lógica)

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ProfileModel } from "./profile.model.js";

export const UserModel = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      default: "user",
    },
  },
  //agrego como segundo parametro estas opciones
  {
    timestamps:true,
    paranoid: true,
  }
);

//relacion 1:1
UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  as: "profile",
});

ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});
