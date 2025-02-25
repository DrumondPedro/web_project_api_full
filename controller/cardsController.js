import { CardModel } from "../models/Card.js";

const sendAllCards = () => {
  return CardModel.find({})
    .then((allCards) => {
      return allCards;
    })
    .catch((err) => console.log(err));
};

const createCard = ({ name, link, owner }) => {
  return CardModel.create({ name, link, owner })
    .then((newCards) => {
      return newCards;
    })
    .catch((err) => console.log(err));
};

const deleteCard = (cardId) => {
  return CardModel.findByIdAndDelete(cardId).catch((err) => console.log(err));
};

export { sendAllCards, createCard, deleteCard };
