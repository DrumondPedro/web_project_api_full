import { Router } from "express";
import { z } from "zod";

import CustomHttpError from "../errors/CustomHttpError.js";
import { validateLogin } from "../validator/signinValidator.js";

import { login } from "../controller/usersController.js";

const signinRouter = Router();

signinRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    validateLogin.parse({ email, password });
    const token = await login({ email, password });
    if (!token) {
      const newError = new CustomHttpError({
        message: `E-mail ou senha incorretos.`,
      });
      newError.unauthorized({ method: "POST", path: "Login" });
      throw newError;
    }
    res.status(200).json(token);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const [zodError] = error.issues;
      const newError = new CustomHttpError({
        message: `${zodError.path}: ${zodError.message}`,
      });
      newError.unauthorized({ method: "POST", path: "Login" });
      error = newError;
    }
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status:${statusCode}`);
    res.status(statusCode).json({ message: `E-mail ou senha incorretos.` });
  }
});

export { signinRouter };
