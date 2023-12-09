import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../controllers/todoController";
import {
  validateCreateTodo,
  validateUpdateTodo,
} from "../validations/todoValidation";

const todoRouter = express.Router();

todoRouter.route("/").get(getAllTodos).post(validateCreateTodo(), createTodo);
todoRouter
  .route("/:id")
  .get(getTodo)
  .put(validateUpdateTodo(), updateTodo)
  .delete(deleteTodo);

export default todoRouter;
