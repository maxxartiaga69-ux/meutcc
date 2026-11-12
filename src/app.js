import express from "express";
import userRouter from "./routes/userrouter.js";

const app = express();

app.use(express.json());
app.use("/usuarios", userRouter);

export default app;