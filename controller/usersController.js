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

export { sendAllUsers, sendUser, createUser };
