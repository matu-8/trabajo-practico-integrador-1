import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
try {
// Obtener token de la cookie
const token = req.cookies["token"]; //con notacion de corchetes, es una forma de acceder a los elementos dentro de una peticion
// Verificar y decodificar token
    const decoded = verifyToken(token);
// Almacenar datos del usuario
    req.user = decoded;
    console.log(req.user);
next();

} catch (error) {
res.status(401).json({ 
    message: error.message });
}
};