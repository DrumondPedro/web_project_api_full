import { UserModel } from "../models/User.js";

import CustomHttpError from "../errors/CustomHttpError.js";

async function sendAllUsers() {
  try {
    const allUsers = await UserModel.find({});
    return allUsers;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.notFound({ method: "MONGO", path: "Users" });
    throw newError;
  }
}

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

async function createUser({ name, about, avatar }) {
  try {
    const createdUser = await UserModel.create({ name, about, avatar });
    return createdUser;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Create User" });
    throw newError;
  }
}

async function updateUser({ id, name, about }) {
  try {
    const updetedUser = await UserModel.findByIdAndUpdate(
      id,
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

async function updateUserAvatar({ id, avatar }) {
  try {
    const updetedUser = await UserModel.findByIdAndUpdate(
      id,
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

export { sendAllUsers, sendUser, createUser, updateUser, updateUserAvatar };
