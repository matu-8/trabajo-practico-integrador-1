import { validationResult } from "express-validator";

  export const results = (req, res, next)=> {
      const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.mapped()});
        }
        console.log(`paso las validaciones`)
        next();
  }


