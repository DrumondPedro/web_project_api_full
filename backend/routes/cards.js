import { Router } from "express";

import CustomHttpError from "../errors/CustomHttpError.js";
import {
  validateCreateCard,
  validateUpdateCard,
} from "../validator/cardValidator.js";

import {
  sendAllCards,
  createCard,
  deleteCard,
  likeCard,
  deslikeCard,
} from "../controller/cardsController.js";

const cardsRouter = Router();

cardsRouter.get("/", async (req, res, next) => {
  try {
    const cards = await sendAllCards();
    if (!cards.length) {
      const newError = new CustomHttpError({
        message: "Nenhum cartão encontrado",
      });
      newError.notFound({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

cardsRouter.post("/", async (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  try {
    validateCreateCard.parse({ name, link, ownerId });
    const newCard = await createCard({ name, link, ownerId });
    if (!newCard) {
      const newError = new CustomHttpError({
        message: `Não foi possivel criar o cartão.`,
      });
      newError.badRequest({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.status(201).json(newCard);
  } catch (err) {
    next(err);
  }
});

cardsRouter.delete("/:cardId", async (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    validateUpdateCard.parse({ cardId, userId });
    const deletedCard = await deleteCard({ cardId, userId });
    if (!deletedCard) {
      const newError = new CustomHttpError({
        message: `Não foi possivel deletar o cartão com id: ${cardId}.`,
      });
      newError.badRequest({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
});

cardsRouter.put("/:cardId/likes", async (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    validateUpdateCard.parse({ cardId, userId });
    const newCard = await likeCard({ cardId, userId });
    if (!newCard) {
      const newError = new CustomHttpError({
        message: `Não foi possivel curtir o cartão com id: ${cardId}`,
      });
      newError.badRequest({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.json(newCard);
  } catch (err) {
    next(err);
  }
});

cardsRouter.delete("/:cardId/likes", async (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    validateUpdateCard.parse({ cardId, userId });
    const newCard = await deslikeCard({ cardId, userId });
    if (!newCard) {
      const newError = new CustomHttpError({
        message: `Não foi possivel descurtir o cartão com id ${cardId}`,
      });
      newError.badRequest({
        method: `${req.method}`,
        path: `${req.originalUrl}`,
      });
      throw newError;
    }
    res.json(newCard);
  } catch (err) {
    next(err);
  }
});

export { cardsRouter };
