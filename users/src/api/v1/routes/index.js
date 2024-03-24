import { Router } from "express";
import { register, login, getUsers } from "../controllers/user.controller.js";
import {authMiddleware, adminMiddleware} from "../../../middlewares/auth.middleware.js";

const apiV1Router = Router();

// Define routes
apiV1Router.post("/register", register);
apiV1Router.post("/login", login);
apiV1Router.get("/users", authMiddleware, adminMiddleware, getUsers);

export default apiV1Router;
