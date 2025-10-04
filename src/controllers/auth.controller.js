import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";
import { passwordCompare, passwordhash } from "../helpers/hash.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { cookie } from "express-validator";

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body; //desestructuro los elementos de usuario del cuerpo de la peticion

    const hashedpassword = await passwordhash(password); //A la funcion de passwordhash (esta como funcion global)
    console.log(hashedpassword);
    //le paso como parametro la contraseña que viene de la peticion.
    // Y creo tanto el usuario como el perfil relacionado al mismo
    const user = await UserModel.create({
      username,
      email,
      password: hashedpassword,
      role,
    });
    // ahora creo el perfil seguido del usuario.
    const { first_name, last_name, biography, avatar_url, birth_date } =
      req.body;

    const profile = await ProfileModel.create({
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
      user_id: user.id,
    });
    console.log(profile);

    return res.status(201).json({
      ok: true,
      msg: "Usuario registrado correctamente",
    });
  } catch (err) {
    res.status(500).json({ msg: `>>> ! error interno del servidor` });
    return console.log(`>>> ! error en registro ${err}`);
  }
};

export const login = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, username } = req.body;
    const user = await UserModel.findOne({
      where: { username: username },
    });
    // include: ProfileModel, //Esto es para que, si encuentra el usuario, traiga tambien el perfil asociado
    // attributes:['first_name', 'last_name'],
    // as:"perfil"

    if (!user) {
      return res.status(400).json({ msg: "Credenciales invalidas" });
    }

    console.log("paso para la validacion de contrasena");
    const validatePassword = await passwordCompare(password, user.password);
    console.log(user.password);
    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: "Credenciales invalidas",
      });
    }
    console.log("Paso a la generacion del token");
    const token = generateToken({
      //genero el token y guardo la informacion de nombre de usuario, id y rol en la cookie
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      ok: true,
      msg: "Se ha iniciado sesion",
    });
  } catch (err) {
    res.status(500).json({ msg: "Error interno de servidor" });
    return console.log(`>>> ! error en login ${err}`);
  }
};
