import jwt from 'jsonwebtoken'

//generacion del token, 
export const generateToken = (payload)=>{
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h", // Lo firmo con jwt.sign y luego seteo la duracion de ese token
        })
    
    } catch (err) {
    console.log(`>>> ! Error en generacion de token ${err}`)
        throw new Error("Error en generar el token")
    }
}

//verificacion de token
export const verifyToken = (token) => {
    try {

        return jwt.verify(token, process.env.JWT_SECRET) 

    } catch (err) {
        console.log(`>>> ! error en varifyToken ${err}`)
        throw new Error("Error en la verificacion de token")
    }
}
