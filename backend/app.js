import express from "express";
import cors from "cors";
import { z } from "zod";
import "dotenv/config";

import { connectDatabase } from "./data/database.js";
import auth from "./middlewares/auth.js";
import { signupRouter } from "./routes/signup.js";
import { signinRouter } from "./routes/signin.js";
import { userRouter } from "./routes/users.js";
import { cardsRouter } from "./routes/cards.js";

import CustomHttpError from "./errors/CustomHttpError.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";

const app = express();
connectDatabase();
const { PORT = 3000 } = process.env;

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use(requestLogger);

const notFound = (req, res, next) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
};

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

app.use("/signup", signupRouter);
app.use("/signin", signinRouter);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardsRouter);
app.use("", notFound);

app.use(errorLogger);

app.use((error, req, res, next) => {
  if (error instanceof z.ZodError) {
    const [err] = error.issues;
    const newError = new CustomHttpError({
      message: `${err.path}: ${err.message}`,
    });
    newError.badRequest({ method: `${req.method}`, path: `${req.path}` });
    error = newError;
  }

  const { statusCode = 500, message, typeError } = error;
  console.log(`Error: ${message} - ${typeError} - Status: ${statusCode}`);

  res.status(statusCode).json({
    message: statusCode === 500 ? "Ocorreu um erro no servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});
