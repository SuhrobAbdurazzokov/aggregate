import express from "express";
import { config } from "dotenv";
import consola from "consola";
import { connectdb } from "./db/index.js";
import AuthorRouter from "./routes/author.route.js";
import BookRouter from "./routes/book.route.js";
import OrederRouter from "./routes/order.route.js";

config();

await connectdb();

const PORT = Number(process.env.PORT);
const app = express();
app.use(express.json());

app.use("/author", AuthorRouter);
app.use("/book", BookRouter);
app.use("/order", OrederRouter);

app.listen(PORT, () => consola.success(`Server running on port: ${PORT}`));
