import asyncHandler from "../middlewares/asyncHandler";
import prisma from "../utils/db";
import customValidationResult from "../utils/validation";

/***
 * @desc    API endpoint to get all todos
 * @route   GET /api/v1/todos
 * @access  Private
 */
export const getAllTodos = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const todos = await prisma.todo.findMany({ where: { userId: user.id } });

  return res.status(200).json({
    message: "Success get all todos",
    data: {
      todos,
    },
  });
});

/***
 * @desc    API endpoint to create new todo
 * @route   POST /api/v1/todos
 * @access  Private
 */
export const createTodo = asyncHandler(async (req, res) => {
  const errors = customValidationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid input",
      errors: errors.mapped(),
    });
  }
  
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { content } = req.body;

  const newTodo = await prisma.todo.create({
    data: { content, userId: user.id },
  });

  return res.status(201).json({
    message: "Success create new todo",
    data: {
      todo: newTodo,
    },
  });
});

/***
 * @desc    API endpoint to get a todo by ID
 * @route   GET /api/v1/todos/:id
 * @access  Private
 */
export const getTodo = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { id } = req.params;

  const todo = await prisma.todo.findUnique({
    where: { id, userId: user.id },
  });

  return res.status(200).json({
    message: "Success get a todo",
    data: {
      todo,
    },
  });
});

/***
 * @desc    API endpoint to update a todo by ID
 * @route   PUT /api/v1/todos/:id
 * @access  Private
 */
export const updateTodo = asyncHandler(async (req, res) => {
  const errors = customValidationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid input",
      errors: errors.mapped(),
    });
  }
  
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { id } = req.params;
  const { content, isCompleted } = req.body;

  const updatedTodo = await prisma.todo.update({
    where: { id, userId: user.id },
    data: {
      content,
      isCompleted,
    },
  });

  return res.status(200).json({
    message: "Success update a todo",
    data: {
      todo: updatedTodo,
    },
  });
});

/***
 * @desc    API endpoint to delete a todo by ID
 * @route   DELETE /api/v1/todos/:id
 * @access  Private
 */
export const deleteTodo = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { id } = req.params;

  await prisma.todo.delete({ where: { id, userId: user.id } });

  return res.status(200).json({
    message: "Success deleted a todo",
    data: null,
  });
});
