import express from "express";
import todoRouter from "./todoRouter";
import { loginUser, registerUser } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import { validateLogin, validateRegister } from "../validations/authValidation";

const apiRouter = express.Router();

// Auth
apiRouter.post("/login", validateLogin(), loginUser);
apiRouter.post("/register", validateRegister(), registerUser);

// Todos
apiRouter.use("/todos", authMiddleware, todoRouter);

export default apiRouter;
