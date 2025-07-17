import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";

const router = Router();

const orderController = new OrderController();

router
  .post("/", orderController.createOrder)
  .get("/author", orderController.bestAuthors)
  .get("/", orderController.getAllOrder)
  .get("/:id", orderController.getOrderById)
  .patch("/:id", orderController.updateOrder)
  .delete("/:id", orderController.deleteOrder);

export default router;
