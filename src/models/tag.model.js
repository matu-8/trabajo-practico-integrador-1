// 5. Tag (Etiqueta)
// ● id (Primary Key, auto increment)
// ● name (VARCHAR(30), único, 2-30 caracteres)
// ● created_at
// ● updated_at

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const tagModel = sequelize.define(
    'tag',{
        name:{
            type:DataTypes.STRING(30),
            unique:true
        },
    }
)