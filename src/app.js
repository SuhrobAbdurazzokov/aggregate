import express from "express";
import { authorRouter, bookRouter, orderRouter } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/author", authorRouter);
app.use("/book", bookRouter);
app.use("/order", orderRouter);

export default app;
