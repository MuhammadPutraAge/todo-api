import { body } from "express-validator";
import prisma from "../utils/db";

export const validateLogin = () => {
  const validateEmail = () =>
    body("email")
      .notEmpty()
      .withMessage("Please input your email")
      .isEmail()
      .withMessage("Please input a valid email");

  const validatePassword = () =>
    body("password").notEmpty().withMessage("Please input your password");

  return [validateEmail(), validatePassword()];
};

export const validateRegister = () => {
  const validateName = () =>
    body("name").notEmpty().withMessage("Please input your name");

  const validateEmail = () =>
    body("email")
      .notEmpty()
      .withMessage("Please input your email")
      .isEmail()
      .withMessage("Please input a valid email")
      .custom(async (email: string) => {
        if (email) {
          const user = await prisma.user.findUnique({ where: { email } });

          if (user) {
            throw new Error("Email already in use");
          }
        }
      });

  const validatePassword = () =>
    body("password")
      .notEmpty()
      .withMessage("Please input your password")
      .isLength({ min: 8 })
      .withMessage("Password should contain at least 8 characters");

  return [validateName(), validateEmail(), validatePassword()];
};
