import { Router } from "express";

import CustomHttpError from "../errors/CustomHttpError.js";

import {
  sendAllCards,
  createCard,
  deleteCard,
  likeCard,
  deslikeCard,
} from "../controller/cardsController.js";

const cardsRouter = Router();

cardsRouter.get("/", async (req, res) => {
  try {
    const cards = await sendAllCards();
    if (!cards.length) {
      const newError = new CustomHttpError({
        message: "Nenhum cartão encontrado",
      });
      newError.notFound({ method: "GET", path: "Cards" });
      throw newError;
    }
    res.json(cards);
  } catch (error) {
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status: ${statusCode}`);
    res.status(statusCode).json({ message: "Nenhum cartão encontrado." });
  }
});

cardsRouter.post("/", async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    if (!name || !link || !owner) {
      const newError = new CustomHttpError({
        message: `Não foi possivel criar cartão. Dasos invalidos`,
      });
      newError.badRequest({ method: "POST", path: "Create Card" });
      throw newError;
    }
    const newCard = await createCard({ name, link, owner });
    if (!newCard) {
      const newError = new CustomHttpError({
        message: `Não foi possivel criar cartão.`,
      });
      newError.badRequest({ method: "POST", path: "Create Card" });
      throw newError;
    }
    res.json(newCard);
  } catch (error) {
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status: ${statusCode}`);
    res
      .status(statusCode)
      .json({ message: "Não foi possivel criar o cartão." });
  }
});

cardsRouter.delete("/:cardId", async (req, res) => {
  const { cardId } = req.params;
  try {
    const deletedCard = await deleteCard(cardId);
    if (!deletedCard) {
      const newError = new CustomHttpError({
        message: `Não foi possivel deletar cartão com id: ${cardId}.`,
      });
      newError.badRequest({ method: "POST", path: "Delete Card" });
      throw newError;
    }
    res.status(204).json({});
  } catch (error) {
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status: ${statusCode}`);
    res
      .status(statusCode)
      .json({ message: `Não foi possivel deletar o cartão com id ${cardId}` });
  }
});

cardsRouter.put("/:cardId/likes", async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    if (!cardId || !userId) {
      const newError = new CustomHttpError({
        message: `Não foi possivel curtir o cartão. Dasos invalidos`,
      });
      newError.badRequest({ method: "POST", path: "Create Card" });
      throw newError;
    }
    const newCard = await likeCard({ cardId, userId });
    if (!newCard) {
      const newError = new CustomHttpError({
        message: `Não foi possivel curtir o cartão.`,
      });
      newError.badRequest({ method: "POST", path: "Create Card" });
      throw newError;
    }
    res.json(newCard);
  } catch (error) {
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status: ${statusCode}`);
    res
      .status(statusCode)
      .json({ message: `Não foi possivel curtir o cartão com id ${cardId}` });
  }
});

cardsRouter.delete("/:cardId/likes", async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    if (!cardId || !userId) {
      const newError = new CustomHttpError({
        message: `Não foi possivel descurtir o cartão. Dasos invalidos`,
      });
      newError.badRequest({ method: "POST", path: "Create Card" });
      throw newError;
    }
    const newCard = await deslikeCard({ cardId, userId });
    if (!newCard) {
      const newError = new CustomHttpError({
        message: `Não foi possivel descurtir o cartão.`,
      });
      newError.badRequest({ method: "POST", path: "Create Card" });
      throw newError;
    }
    res.json(newCard);
  } catch (error) {
    const { message, typeError, statusCode } = error;
    console.log(`Error: ${message} - ${typeError} - Status: ${statusCode}`);
    res.status(statusCode).json({
      message: `Não foi possivel descurtir o cartão com id ${cardId}`,
    });
  }
});

export { cardsRouter };
