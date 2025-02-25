import { CardModel } from "../models/Card.js";

const sendAllCards = () => {
  return CardModel.find({})
    .then((allCards) => {
      return allCards;
    })
    .catch((err) => console.log(err));
};

const deleteCard = (id) => {
  return CardModel.findByIdAndRemove(id).catch((err) => console.log(err));
};

const createCard = ({ owner, name, link }) => {
  return CardModel.create({ owner, name, link })
    .then((newCards) => {
      return newCards;
    })
    .catch((err) => console.log(err));
};

export { sendAllCards, deleteCard, createCard };
