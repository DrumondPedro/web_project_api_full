import { Router } from "express";

import CustomHttpError from "../errors/CustomHttpError.js";
import {
  validateIdUser,
  validateUpdateUser,
  validateUpdateAvatar,
} from "../validator/userValidator.js";

import {
  sendUser,
  updateUser,
  updateUserAvatar,
} from "../controller/usersController.js";

const userRouter = Router();

userRouter.get("/me", async (req, res, next) => {
  const userId = req.user._id;
  try {
    validateIdUser.parse({ userId });
    const user = await sendUser(userId);
    if (!user) {
      const newError = new CustomHttpError({
        message: `Não foi possivel encontrar suário com o ID: ${userId}`,
      });
      newError.notFound({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.patch("/me", async (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  try {
    validateUpdateUser.parse({ userId, name, about });
    const updetedUser = await updateUser({ userId, name, about });
    if (!updetedUser) {
      const newError = new CustomHttpError({
        message: `Não foi possivel atualizar suário com o ID: ${userId}`,
      });
      newError.badRequest({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.json(updetedUser);
  } catch (err) {
    next(err);
  }
});

userRouter.patch("/me/avatar", async (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  try {
    validateUpdateAvatar.parse({ userId, avatar });
    const updetedUser = await updateUserAvatar({ userId, avatar });
    if (!updetedUser) {
      const newError = new CustomHttpError({
        message: `Não foi possivel atualizar o avatar do suário com o ID: ${userId}`,
      });
      newError.badRequest({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.json(updetedUser);
  } catch (err) {
    next(err);
  }
});

export { userRouter };
