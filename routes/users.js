const users = require("express").Router();

const usersData = [
  {
    name: "Ada Lovelace",
    about: "Mathematician, writer",
    avatar:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
    _id: "dbfe53c3c4d568240378b0c6",
  },
  {
    name: "Tim Berners-Lee",
    about: "Inventor, scientist",
    avatar:
      "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
    _id: "d285e3dceed844f902650f40",
  },
  {
    name: "Grace Hopper",
    about: "Computer scientist",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg/800px-Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg",
    _id: "7d8c010a1c97ca2654997a95",
  },
];

const sendAllUsers = (req, res, next) => {
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

users.get("/users", sendAllUsers);

users.get("/users/:_id", doesUserExist, sendUser);

module.exports = users;
