import { Router } from "express";
import fs from "node:fs";
import path from "node:path";

const __dirname = import.meta.dirname;
const cards_router = Router();

var cardsData = [];

const filePath = path.join(__dirname, "..", "data", "cards.json");

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log(`Arquivo não encontrado. ${err}`);
    return;
  }
  cardsData = JSON.parse(data);
});

const sendAllCards = (req, res, next) => {
  if (cardsData.length === 0) {
    res.status(404).send({ message: "Arquivo não encontrado" });
    return;
  }
  res.send(cardsData);
};

cards_router.get("/", sendAllCards);

export { cards_router };
