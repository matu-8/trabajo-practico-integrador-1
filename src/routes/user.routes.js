import { Router } from "express";
import { createUserValidation,
        deleteUserValidation,
        updateUserValidation
    } from "../middleware/validations/userValidator.js";
import { Results} from "../middleware/validator.js"; 
import { createUser,
        deleteUser,
        updateUser 
    } from "../controllers/user.controller.js";

export const UserRouter = Router()

// UserRouter.get('/users',)
// UserRouter.get('/users',)
UserRouter.post('/users',
    createUserValidation,
    Results,
    createUser
);
UserRouter.put('/users/:id',
    updateUserValidation,
    Results,
    updateUser
);
UserRouter.delete('/users/:id',
    deleteUserValidation,
    Results,
    deleteUser
);