import mongoose from "mongoose";

function connectDatabase() {
  mongoose
    .connect("mongodb://localhost:27017/arounddb")
    .then(() => console.log("MongoDB conectado com sucesso"))
    .catch((err) => console.log("Erro de conexão:", err));
}

export { connectDatabase };
