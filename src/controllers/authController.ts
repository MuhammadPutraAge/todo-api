import asyncHandler from "../middlewares/asyncHandler";
import {
  compareHashPassword,
  generateToken,
  hashPassword,
} from "../utils/auth";
import prisma from "../utils/db";
import customValidationResult from "../utils/validation";

/**
 * @desc    API endpoint to log in user to the app
 * @route   POST /api/v1/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const errors = customValidationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid input",
      errors: errors.mapped(),
    });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const isValidPassword = await compareHashPassword(
    password,
    user.passwordHash
  );

  if (!isValidPassword) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  return res.status(200).json({
    message: "Login success",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
});

/**
 * @desc    API endpoint to register a new user to the app
 * @route   POST /api/v1/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const errors = customValidationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid input",
      errors: errors.mapped(),
    });
  }
  
  const { name, email, password } = req.body;

  const passwordHash = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  const token = generateToken(newUser.id);

  return res.status(201).json({
    message: "Register success",
    data: {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    },
  });
});
