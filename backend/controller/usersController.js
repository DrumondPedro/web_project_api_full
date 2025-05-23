import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/User.js";
import CustomHttpError from "../errors/CustomHttpError.js";

const { NODE_ENV, KEY_SECRET } = process.env;

async function sendUser(id) {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.notFound({ method: "MONGO", path: "User" });
    throw newError;
  }
}

async function createUser({ name, about, avatar, email, password }) {
  try {
    const hash = await bcrypt.hash(password, 10);
    const createdUser = await UserModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    return {
      name: createdUser.name,
      about: createdUser.about,
      avatar: createdUser.avatar,
      email: createdUser.email,
      _id: createdUser._id,
    };
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Create User" });
    throw newError;
  }
}

async function login({ email, password }) {
  try {
    const user = await UserModel.findUserByCredentials({ email, password });
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? KEY_SECRET : "alternative-test-key",
      {
        expiresIn: "7d",
      }
    );
    return { token };
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.unauthorized({ method: "MONGO", path: "Login" });
    throw newError;
  }
}

async function updateUser({ userId, name, about }) {
  try {
    const updetedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    );
    return updetedUser;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Update User" });
    throw newError;
  }
}

async function updateUserAvatar({ userId, avatar }) {
  try {
    const updetedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    );
    return updetedUser;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Update User" });
    throw newError;
  }
}

export { sendUser, createUser, updateUser, updateUserAvatar, login };
