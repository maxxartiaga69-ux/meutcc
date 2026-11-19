import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userrouter.js";
// Etapa 2: vamos reativar estas duas linhas
// import bibliotecaRoutes from "./routes/bibliotecaRoutes.js";
// import favoritosRoutes from "./routes/favoritosRoutes.js";

import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/auth", authRoutes);
app.use("/usuarios", userRouter);
// app.use("/biblioteca", bibliotecaRoutes);
// app.use("/favoritos", favoritosRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;