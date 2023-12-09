import { body } from "express-validator";

export const validateCreateTodo = () =>
  body("content").notEmpty().withMessage("Please input the todo");

export const validateUpdateTodo = () => {
  const validateTodoContent = () =>
    body("content").notEmpty().withMessage("Please input the todo");

  const validateTodoStatus = () =>
    body("isCompleted")
      .notEmpty()
      .withMessage("Please choose todo status")
      .isBoolean()
      .withMessage("Todo status should be completed or not completed");

  return [validateTodoContent(), validateTodoStatus()]
};
