import express from "express";

import { user_router } from "./routes/users.js";
import { cards_router } from "./routes/cards.js";

const app = express();

const { PORT = 3000 } = process.env;

const notFound = (req, res, next) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
};

app.use("/users", user_router);
app.use("/cards", cards_router);
app.use("", notFound);

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});
