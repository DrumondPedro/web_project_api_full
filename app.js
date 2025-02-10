const express = require("express");
const user = require("./routes/users");
const app = express();

const { PORT = 3000 } = process.env;

app.use("/", user);

app.listen(PORT, () => {
  console.log(`App executando na porta ${PORT}`);
});
