const express = require("express");

const user = require("./routes/users");
const cards = require("./routes/cards");

const app = express();

const { PORT = 3000 } = process.env;

const notFound = (req, res, next) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
};

app.use("/", user);
app.use("/", cards);
app.use("*", notFound);

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});
