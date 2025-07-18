import { Router } from "express";
import { AuthorController } from "../controllers/index.js";

const authorRouter = Router();

const authorController = new AuthorController();

authorRouter
  .post("/", authorController.createAuthor)
  .get("/", authorController.getAllAuthors)
  .get("/:id", authorController.getAuthorById)
  .patch("/:id", authorController.updateAuthor)
  .delete("/:id", authorController.deleteAuthor);

export default authorRouter;
