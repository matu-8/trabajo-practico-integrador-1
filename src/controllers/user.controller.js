import { UserModel } from "../models/user.model.js"
import { passwordhash } from "../helpers/hash.helper.js";
import { where } from "sequelize";

export const createUser = async(req, res) => {
    try {
        const {username, email, password, role} = req.body;
        const passwordHashed = await passwordhash(password)

        const createdUser= await UserModel.create({
            username,
            email,
            password:passwordHashed,
            role
        });

        return res.status(201).json({msg:"usuario creado", createdUser})

    } catch (err) {
        console.log(`>>> ! error del servidor ${err}`)
        res.status(500).json({msg:err.msg})
    }
}

export const updateUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const {username, email, password, role} = req.body;
        const user = await UserModel.update({
            username,
            email,
            password,
            role
        },
        {where:{id}})
        return res.status(200).json({msg:"Usuario actualizado"})

    } catch (err) {
         console.log(`>>> ! error en updateUser ${err}`)
        res.status(500).json({msg:err.msg})
    }
}

export const deleteUser =  async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await UserModel.destroy({where:{id}})
        return res.status(200).json({msg:"Usuario eliminado correctamente"})
    } catch (err) {
         console.log(`>>> ! error en deleteUser ${err}`)
        res.status(500).json({msg:err.msg})
    }
}