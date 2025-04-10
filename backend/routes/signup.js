import { Router } from "express";
import { z } from "zod";

import CustomHttpError from "../errors/CustomHttpError.js";
import { validateCreateUser } from "../validator/userValidator.js";

import { createUser } from "../controller/usersController.js";

const signupRouter = Router();

signupRouter.post("/", async (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  try {
    validateCreateUser.parse({ name, about, avatar, email, password });
    const newUser = await createUser({ name, about, avatar, email, password });
    if (!newUser) {
      const newError = new CustomHttpError({
        message: `Não foi possivel criar usuário.`,
      });
      newError.badRequest({ method: "POST", path: "Create User" });
      throw newError;
    }
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const [err] = error.issues;
      const newError = new CustomHttpError({
        message: `${err.path}: ${err.message}`,
      });
      newError.badRequest({ method: "POST", path: "Create User" });
      error = newError;
    }
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status:${statusCode}`);
    res.status(statusCode).json({ message: `Não foi possivel criar usuário.` });
  }
});

export { signupRouter };
