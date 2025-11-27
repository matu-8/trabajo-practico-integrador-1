export const adminMiddleware = (req, res, next)=>{
    const {role} = req.user;
    if(role == "admin"){
        return next();
    }
    res.status(403).json({ok:false, ms:'No esta autorizado para realizar esta accion'})
}
