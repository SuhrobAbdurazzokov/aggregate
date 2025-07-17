import { Router } from "express";
import { BookController } from "../controllers/book.controller.js";

const router = Router();

const bookController = new BookController();

router
  .post("/", bookController.createBook)
  .get("/", bookController.getAllBooks)
  .get("/genre", bookController.bestGenre)
  .get("/avg", bookController.avgPriceByGenre)
  .get("/:id", bookController.getBookById)
  .patch("/:id", bookController.updateBook)
  .delete("/:id", bookController.deleteBook);

export default router;
