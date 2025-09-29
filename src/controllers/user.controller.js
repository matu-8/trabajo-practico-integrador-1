import { UserModel } from "../models/user.model.js";

export const getAllUsers = async(req, res)=>{
    try {
        const user = await UserModel.findAll()
        console.log(user)
        if (user.length === 0 ) {
            return res .status(400).json({
                ok:true,
                msg:"No se han encontrado usuarios"
            });
        }
        return res.status(200).json({
            ok:true,
            msg:"Se han encntrado estos usuarios",
            data:user
        })
    } catch (error) {
        console.log(`>>> ! error en getAllUsers ${error}`)
        return res.status(500).json({
            ok:false,
            msg:"Error interno del servidor",
            data: error
        })
    }
}
export const getUsersById = async(req, res)=>{
    const {id} = req.params
    try {
        //validacion basica - verificación de existencia
        const user = await UserModel.findByPk(id)
        console.log(user)
        if (!user ) {
            return res .status(400).json({
                msg:"No se encontró el usuario"
            });
        }
        return res.status(200).json({
            ok:true,
            msg:"Se ha encontrado el usuario",
            data:user
        })
    } catch (error) {
         console.log(`>>> ! error en getUsersById ${error}`)
        return res.status(500).json({
            ok:false,
            msg:"Error interno del servidor"
            
        })
    }
}
 export const updateUser = async(req, res)=>{
    const {username, email, role} = req.body
 }