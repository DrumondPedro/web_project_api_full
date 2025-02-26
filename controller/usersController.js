import { UserModel } from "../models/User.js";

const sendAllUsers = () => {
  return UserModel.find({})
    .then((allUsers) => {
      return allUsers;
    })
    .catch((err) => console.log(err));
};

const sendUser = (id) => {
  return UserModel.findById(id)
    .then((user) => {
      return user;
    })
    .catch((err) => console.log(err));
};

const createUser = ({ name, about, avatar }) => {
  return UserModel.create({ name, about, avatar })
    .then((createdUser) => {
      return createdUser;
    })
    .catch((err) => console.log(err));
};

const updateUser = ({ id, name, about }) => {
  return UserModel.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((updetedUser) => {
      return updetedUser;
    })
    .catch((err) => console.log(err));
};

const updateUserAvatar = ({ id, avatar }) => {
  return UserModel.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((updetedUser) => {
      return updetedUser;
    })
    .catch((err) => console.log(err));
};

export { sendAllUsers, sendUser, createUser, updateUser, updateUserAvatar };
