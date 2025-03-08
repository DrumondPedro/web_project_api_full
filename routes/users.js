import { Router } from "express";

import CustomHttpError from "../errors/CustomHttpError.js";

import {
  sendAllUsers,
  sendUser,
  createUser,
  updateUser,
  updateUserAvatar,
} from "../controller/usersController.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await sendAllUsers();
    if (!users.length) {
      const newError = new CustomHttpError({
        message: "Nenhum usuário encontrado",
      });
      newError.notFound({
        method: "GET",
        path: "Users",
      });
      throw newError;
    }
    res.json(users);
  } catch (error) {
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status: ${statusCode}`);
    res.status(statusCode).json({ message: "Nenhum usuário encontrado." });
  }
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
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

userRouter.post("/", async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await createUser({ name, about, avatar });
    if (!newUser) {
      const newError = new CustomHttpError({
        message: `Não foi possivel criar usuário.`,
      });
      newError.badRequest({ method: "POST", path: "Create User" });
      throw newError;
    }
    res.status(201).json(newUser);
  } catch (error) {
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status:${statusCode}`);
    res.status(statusCode).json({ message: `Não foi possivel criar usuário.` });
  }
});

userRouter.patch("/me", async (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  try {
    if (!name || !about || !id) {
      const newError = new CustomHttpError({
        message: `Não foi possivel atualizar suário com o ID: ${id}`,
      });
      newError.badRequest({ method: "PATCH", path: "Update User" });
      throw newError;
    }
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
    if (!avatar || !id) {
      const newError = new CustomHttpError({
        message: `Não foi possivel atualizar suário com o ID: ${id}`,
      });
      newError.badRequest({ method: "PATCH", path: "Update User" });
      throw newError;
    }
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
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status:${statusCode}`);
    res
      .status(statusCode)
      .json({ message: `Não foi possivel atualizar suário com o ID: ${id}` });
  }
});

export { userRouter };
