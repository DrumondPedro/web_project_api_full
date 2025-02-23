import express from "express";

import { connectDatabase } from "./data/database.js";
import { userRouter } from "./routes/users.js";
import { cardsRouter } from "./routes/cards.js";

const app = express();
connectDatabase();
const { PORT = 3000 } = process.env;

const notFound = (req, res, next) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
};

app.use("/users", userRouter);
app.use("/cards", cardsRouter);
app.use("", notFound);

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});

// implementar um HATEOAS
// criar classe de erro personalisada
// implem,entar sanitização JOI ou ZOD
// implementar serialização
