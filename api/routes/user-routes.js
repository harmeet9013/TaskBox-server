import { Router } from "express";
import { userAuth } from "../controllers/user-controllers.js";

const usersRoutes = Router();

usersRoutes.post("/users", userAuth);

export default usersRoutes;
