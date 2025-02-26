import { Router } from "express";

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
    res.json(users);
  } catch (error) {
    res.status(404).json({ error: "Usiarios não encontrados" });
  }
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await sendUser(id);
    if (!user) {
      res.status(404).json({ error: `Usuario ${id} não encontrado` });
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: `Usuario ${id} não encontrado` });
  }
});

userRouter.post("/", async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await createUser({ name, about, avatar });
    res.status(201).json(newUser);
  } catch (error) {
    res.json({ error: `Não foi possivel criar usuário` });
  }
});

userRouter.patch("/me", async (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  try {
    const updetedUser = await updateUser({ id, name, about });
    res.json(updetedUser);
  } catch (error) {
    res.json({ error: `Não foi possivel atualizar usuário` });
  }
});

userRouter.patch("/me/avatar", async (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  try {
    const updetedUser = await updateUserAvatar({ id, avatar });
    res.json(updetedUser);
  } catch (error) {
    res.json({ error: `Não foi possivel atualizar avatar` });
  }
});

export { userRouter };
