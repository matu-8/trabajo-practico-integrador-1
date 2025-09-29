// 2. Profile (Perfil de Usuario)
// ● id (Primary Key, auto increment)
// ● user_id (Foreign Key → User, único)
// ● first_name (VARCHAR(50))
// ● last_name (VARCHAR(50))
// ● biography (TEXT, opcional)
// ● avatar_url (VARCHAR(255), opcional)
// ● birth_date (DATE, opcional)
// ● created_at
// ● updated_at

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const ProfileModel = sequelize.define(
    'profile',{
        
        first_name:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        last_name:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        biography:{
            type:DataTypes.TEXT

        },
        avatar_url:{
            type:DataTypes.STRING(255),
        },
        birth_date:{
            type:DataTypes.DATEONLY
        },
    })
