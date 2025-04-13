import { CardModel } from "../models/Card.js";

import CustomHttpError from "../errors/CustomHttpError.js";

async function sendAllCards() {
  try {
    const allCards = await CardModel.find({}).populate(["owner", "likes"]);
    return allCards;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.notFound({ method: "MONGO", path: "Cards" });
    throw newError;
  }
}

async function createCard({ name, link, owner }) {
  try {
    const newCard = await CardModel.create({ name, link, owner });
    return newCard;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Create Card" });
    throw newError;
  }
}

async function deleteCard({ cardId, userId }) {
  try {
    const card = await CardModel.findById(cardId);
    if (card.owner.toString() !== userId) {
      const newError = new CustomHttpError({
        message: "O usuário não é dono desse cartão",
      });
      newError.badRequest({ method: "MONGO", path: "Delete Card" });
      throw newError;
    }
    const deletedCard = await CardModel.findByIdAndDelete(cardId);
    return deletedCard;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Delete Card" });
    throw newError;
  }
}

async function likeCard({ cardId, userId }) {
  try {
    const newCards = await CardModel.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    return newCards;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Like Card" });
    throw newError;
  }
}

async function deslikeCard({ cardId, userId }) {
  try {
    const newCards = await CardModel.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true }
    );
    return newCards;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.badRequest({ method: "MONGO", path: "Deslike Card" });
    throw newError;
  }
}

export { sendAllCards, createCard, deleteCard, likeCard, deslikeCard };

// const deleteAllCards = ({ owner }) {
//   return await CardModel.deleteMany({ owner }).catch((err) => console.log(err));
// };
