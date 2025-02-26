import { CardModel } from "../models/Card.js";

const sendAllCards = () => {
  return CardModel.find({})
    .populate(["owner", "likes"])
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

const likeCard = ({ cardId, userId }) => {
  return CardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  );
};

const deslikeCard = ({ cardId, userId }) => {
  return CardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true }
  );
};

export { sendAllCards, createCard, deleteCard, likeCard, deslikeCard };

// const deleteAllCards = ({ owner }) => {
//   return CardModel.deleteMany({ owner }).catch((err) => console.log(err));
// };
