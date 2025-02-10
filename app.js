const express = require("express");
const user = require("./routes/users");
const cards = require("./routes/cards");
const app = express();

const { PORT = 3000 } = process.env;

app.use("/", user);
app.use("/", cards);

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});
