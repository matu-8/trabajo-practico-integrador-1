import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { deleteUser} from "../controllers/user.controller.js";
import { deleteUserValidation } from "../middleware/validations/userValidator.js";

export const UserRouter = Router();

UserRouter.get("/users", 
    getAllUsers);
// UserRouter.get("/users/:id");
// UserRouter.put("/users/:id");
UserRouter.delete("/users/:id",
    deleteUserValidation,
    deleteUser );
