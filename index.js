import "dotenv/config";
import app from "./src/app.js";

if (!process.env.JWT_SECRET) {
  throw new Error("5a7a65a2f9c3ee5d0339c79ea695aa9e27847c31a46026bf6a733020947b82c63ead54ec3a1065e871954487be7247b6");
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});