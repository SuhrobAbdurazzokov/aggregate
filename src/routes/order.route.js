import { Router } from "express";
import { OrderController } from "../controllers/index.js";

const orderRouter = Router();

const orderController = new OrderController();

orderRouter
  .post("/", orderController.createOrder)
  .get("/author", orderController.bestAuthors)
  .get("/", orderController.getAllOrder)
  .get("/:id", orderController.getOrderById)
  .patch("/:id", orderController.updateOrder)
  .delete("/:id", orderController.deleteOrder);

export default orderRouter;
