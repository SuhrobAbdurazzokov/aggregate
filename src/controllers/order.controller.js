import mongoose from "mongoose";
import Order from "../models/order.model.js";

export class OrderController {
  async createOrder(req, res) {
    try {
      const newOrder = await Order.create(req.body);

      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: newOrder,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "interval server error",
      });
    }
  }

  async getAllOrder(req, res) {
    try {
      const query = req.query?.search;
      const pepline = [
        {
          $lookup: {
            from: "books",
            localField: "bookId",
            foreignField: "_id",
            as: "bookInfo",
          },
        },
        {
          $unwind: { path: "$bookInfo", preserveNullAndEmptyArrays: true },
        },

        {
          $project: {
            _id: 1,
            quantity: 1,
            totalPrice: 1,
            date: 1,
            book: "$bookInfo",
          },
        },
      ];
      if (query) {
        pepline.splice(pepline.length - 1, 0, {
          $match: { title: { $regex: query, $options: "i" } },
        });
      }
      const order = await Order.aggregate(pepline);
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: order,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "interval server error",
      });
    }
  }

  async bestAuthors(_, res) {
    try {
      const result = await Order.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "bookId",
            foreignField: "_id",
            as: "bookInfo",
          },
        },
        {
          $unwind: "$bookInfo",
        },
        {
          $lookup: {
            from: "authors",
            localField: "bookInfo.author",
            foreignField: "_id",
            as: "authorInfo",
          },
        },
        {
          $unwind: "$authorInfo",
        },
        {
          $group: {
            _id: "$authorInfo._id",
            name: { $first: "$authorInfo.name" },
            totalEarned: { $sum: "$total_price" },
          },
        },
        {
          $sort: { totalEarned: -1 },
        },
      ]);

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error",
      });
    }
  }

  async getOrderById(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "invalid object Id",
        });
      }
      const id = new mongoose.Types.ObjectId(req.params.id);
      const order = await Order.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "bookId",
            foreignField: "_id",
            as: "bookInfo",
          },
        },
        {
          $unwind: { path: "$authorInfo", preserveNullAndEmptyArrays: true },
        },

        {
          $match: { _id: id },
        },

        {
          $project: {
            _id: 1,
            quantity: 1,
            totalPrice: 1,
            date: 1,
            book: "$bookInfo",
          },
        },
      ]);
      if (!order) {
        return res.status(404).json({
          statusCode: 404,
          message: "order not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: order,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "interval server error",
      });
    }
  }

  async updateOrder(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "invalid object id",
        });
      }
      const updatingOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: updatingOrder,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "internal server error",
      });
    }
  }
  async deleteOrder(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "invalid object id",
        });
      }
      const deletedOrder = await Order.findByIdAndDelete(id);

      if (!deletedOrder) {
        return res.status(404).json({
          statusCode: 404,
          message: "order not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "internal server error",
      });
    }
  }
}
