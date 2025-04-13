import express from "express";
import cors from "cors";

import { connectDatabase } from "./data/database.js";
import auth from "./middlewares/auth.js";
import { signupRouter } from "./routes/signup.js";
import { signinRouter } from "./routes/signin.js";
import { userRouter } from "./routes/users.js";
import { cardsRouter } from "./routes/cards.js";

const app = express();
connectDatabase();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.use(cors());
app.options("*", cors());

const notFound = (req, res, next) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
};

app.use("/signup", signupRouter);
app.use("/signin", signinRouter);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);
app.use("", notFound);

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});
