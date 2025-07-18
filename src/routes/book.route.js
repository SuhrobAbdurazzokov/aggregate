import { Router } from "express";
import { BookController } from "../controllers/index.js";

const bookRouter = Router();

const bookController = new BookController();

bookRouter
  .post("/", bookController.createBook)
  .get("/", bookController.getAllBooks)
  .get("/genre", bookController.bestGenre)
  .get("/avg", bookController.avgPriceByGenre)
  .get("/:id", bookController.getBookById)
  .patch("/:id", bookController.updateBook)
  .delete("/:id", bookController.deleteBook);

export default bookRouter;
