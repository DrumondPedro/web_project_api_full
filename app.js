const express = require("express");

console.log("teste");

const app = express();

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});
