import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";

export const UserRouter = Router();

UserRouter.get("/users", 
    getAllUsers);
UserRouter.get("/users/:id");
UserRouter.put("/users/:id");
UserRouter.delete("/users/:id");
