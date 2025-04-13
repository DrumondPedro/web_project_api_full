import { Router } from "express";
import { z } from "zod";

import CustomHttpError from "../errors/CustomHttpError.js";
import {
  validateUpdateUser,
  validateUpdateAvatar,
} from "../validator/userValidator.js";

import {
  sendAllUsers,
  sendUser,
  updateUser,
  updateUserAvatar,
} from "../controller/usersController.js";

const userRouter = Router();

// userRouter.get("/", async (req, res) => {
//   try {
//     const users = await sendAllUsers();
//     if (!users.length) {
//       const newError = new CustomHttpError({
//         message: "Nenhum usuário encontrado",
//       });
//       newError.notFound({
//         method: "GET",
//         path: "Users",
//       });
//       throw newError;
//     }
//     res.json(users);
//   } catch (error) {
//     const { message, typeError, statusCode } = error;
//     console.log(`Error: ${message} - ${typeError} - Status: ${statusCode}`);
//     res.status(statusCode).json({ message: "Nenhum usuário encontrado." });
//   }
// });

// userRouter.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await sendUser(id);
//     if (!user) {
//       const newError = new CustomHttpError({
//         message: `Não foi possivel encontrar suário com o ID: ${id}`,
//       });
//       newError.notFound({ method: "GET", path: "Users" });
//       throw newError;
//     }
//     res.json(user);
//   } catch (error) {
//     const { message, typeError, statusCode } = error;
//     console.log(`Error: ${message} - ${typeError} - Status:${statusCode}`);
//     res
//       .status(statusCode)
//       .json({ message: `Não foi possivel encontrar suário com o ID: ${id}` });
//   }
// });

userRouter.get("/me", async (req, res) => {
  const id = req.user._id;
  try {
    const user = await sendUser(id);
    if (!user) {
      const newError = new CustomHttpError({
        message: `Não foi possivel encontrar suário com o ID: ${id}`,
      });
      newError.notFound({ method: "GET", path: "Users" });
      throw newError;
    }
    res.json(user);
  } catch (error) {
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status:${statusCode}`);
    res
      .status(statusCode)
      .json({ message: `Não foi possivel encontrar suário com o ID: ${id}` });
  }
});

userRouter.patch("/me", async (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  try {
    validateUpdateUser.parse({ id, name, about });
    const updetedUser = await updateUser({ id, name, about });
    if (!updetedUser) {
      const newError = new CustomHttpError({
        message: `Não foi possivel atualizar suário com o ID: ${id}`,
      });
      newError.badRequest({ method: "PATCH", path: "Update User" });
      throw newError;
    }
    res.json(updetedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const [err] = error.issues;
      const newError = new CustomHttpError({
        message: `${err.path}: ${err.message}`,
      });
      newError.badRequest({ method: "POST", path: "Update User" });
      error = newError;
    }
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status:${statusCode}`);
    res
      .status(statusCode)
      .json({ message: `Não foi possivel atualizar suário com o ID: ${id}` });
  }
});

userRouter.patch("/me/avatar", async (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  try {
    validateUpdateAvatar.parse({ id, avatar });
    const updetedUser = await updateUserAvatar({ id, avatar });
    if (!updetedUser) {
      const newError = new CustomHttpError({
        message: `Não foi possivel atualizar suário com o ID: ${id}`,
      });
      newError.badRequest({ method: "PATCH", path: "Update Avatar User" });
      throw newError;
    }
    res.json(updetedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const [err] = error.issues;
      const newError = new CustomHttpError({
        message: `${err.path}: ${err.message}`,
      });
      newError.badRequest({ method: "POST", path: "Update Avatar User" });
      error = newError;
    }
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status:${statusCode}`);
    res
      .status(statusCode)
      .json({ message: `Não foi possivel atualizar suário com o ID: ${id}` });
  }
});

export { userRouter };
