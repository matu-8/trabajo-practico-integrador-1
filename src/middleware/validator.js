import { body, validationResult } from "express-validator";

export const controller = (req,res, next)=> {

    const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(200).json({msg:`No han ocurrido errores`});
      }
      return res.status(400).json({ errors: result.array()});
}

next();

