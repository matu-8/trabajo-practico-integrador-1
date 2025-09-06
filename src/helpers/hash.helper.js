import bcrypt from "bcryptjs";
//hasheo de contraseña
export const passwordhash = async(password) => {
    const saltRounds = 10 
     return await bcrypt.hash(password, saltRounds)
    }
     //retorno el hasheo de la contraseña cuyo segundo parametro
     //es la cantidad de rondas o iteraciones que realiza el sistema para encriptar la contraseña
     //Este proceso se denomina "salt" o "salting" en criptografía.

//verificación de contraseña

export const passwordCompare = async(password, passwordHashed)=>{
    return await bcrypt.compare(password, passwordHashed);
}

