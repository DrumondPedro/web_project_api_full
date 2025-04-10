import express from "express";

import { connectDatabase } from "./data/database.js";
import { signupRouter } from "./routes/signup.js";
import { userRouter } from "./routes/users.js";
import { cardsRouter } from "./routes/cards.js";

const app = express();
connectDatabase();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "67cb8a344b8b3ebc89ef7021",
  };

  next();
});

const notFound = (req, res, next) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
};

app.use("/signup", signupRouter);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);
app.use("", notFound);

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});
