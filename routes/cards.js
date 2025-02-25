import { Router } from "express";

import {
  sendAllCards,
  createCard,
  deleteCard,
} from "../controller/cardsController.js";

const cardsRouter = Router();

cardsRouter.get("/", async (req, res) => {
  try {
    const cards = await sendAllCards();
    res.json(cards);
  } catch (error) {
    res.status(404).json({ error: "Cartões não encontrados" });
  }
});

cardsRouter.post("/", async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const newCard = await createCard({ name, link, owner });
    res.json(newCard);
  } catch (error) {
    res.json({ error: `Não foi possivel criar o cartão` });
  }
});

cardsRouter.delete("/:cardId", async (req, res) => {
  const { cardId } = req.params;
  try {
    await deleteCard(cardId);
    res.status(204).json({});
  } catch (error) {
    res.json({ error: `Não foi possivel deletar o cartão ${cardId}` });
  }
});

export { cardsRouter };
