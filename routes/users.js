import { Router } from "express";
import fs from "node:fs";
import path from "node:path";

const __dirname = import.meta.dirname;
const userRouter = Router();

let usersData = [];

const filePath = path.join(__dirname, "..", "data", "users.json");

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.log(`Arquivo não encontrado. ${err}`);
    return;
  }
  usersData = JSON.parse(data);
});

const sendAllUsers = (req, res, next) => {
  if (usersData.length === 0) {
    res.status(404).send({ message: "Arquivo não encontrado" });
    return;
  }
  res.send(usersData);
};

const doesUserExist = (req, res, next) => {
  if (!usersData.find((user) => user._id === req.params._id)) {
    res.status(404).send({ message: "ID do usuário não encontrado" });
    return;
  }
  next();
};

const sendUser = (req, res, next) => {
  res.send(usersData.filter((user) => user._id === req.params._id));
};

userRouter.get("/", sendAllUsers);

userRouter.get("/:_id", doesUserExist, sendUser);

export { userRouter };
