import { Router } from "express";
import { AuthorController } from "../controllers/author.controller.js";

const router = Router();

const authorController = new AuthorController();

router
  .post("/", authorController.createAuthor)
  .get("/", authorController.getAllAuthors)
  .get("/:id", authorController.getAuthorById)
  .patch("/:id", authorController.updateAuthor)
  .delete("/:id", authorController.deleteAuthor);

export default router;
