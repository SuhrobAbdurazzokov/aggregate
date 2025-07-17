import mongoose from "mongoose";
import Books from "../models/book.model.js";

export class BookController {
  async createBook(req, res) {
    try {
      const newBook = await Books.create(req.body);

      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: newBook,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "interval server error",
      });
    }
  }

  async avgPriceByGenre(_, res) {
    try {
      const result = await Books.aggregate([
        {
          $group: {
            _id: "$genre",
            avgPrice: { $avg: "$price" },
          },
        },
        {
          $project: {
            _id: 0,
            genre: "$_id",
            avgPrice: { $round: ["$avgPrice", 2] },
          },
        },
        {
          $sort: { avgPrice: -1 },
        },
      ]);

      return res.status(200).json({
        statusCode: 200,
        message: "Average price by genre",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "Internal server error",
      });
    }
  }

  async bestGenre(_, res) {
    try {
      const result = await Books.aggregate([
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "bookId",
            as: "orderInfo",
          },
        },
        {
          $unwind: {
            path: "$orderInfo",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $group: {
            _id: "$genre",
            totalSold: { $sum: 1 },
          },
        },
        {
          $sort: { totalSold: -1 },
        },
        {
          $limit: 1,
        },
      ]);

      return res.status(200).json({
        statusCode: 200,
        message: "most sold genre",
        data: result[0] || {},
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "internal server error",
      });
    }
  }

  async getAllBooks(req, res) {
    try {
      const query = req.query?.search;
      const pepline = [
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "authorInfo",
          },
        },
        {
          $unwind: { path: "$authorInfo", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "bookId",
            as: "orderInfo",
          },
        },
        {
          $unwind: { path: "$orderInfo", preserveNullAndEmptyArrays: true },
        },

        {
          $project: {
            _id: 1,
            title: 1,
            author: 1,
            genre: 1,
            price: 1,
            author: "$authorInfo.name",
            order: "$orderInfo",
          },
        },
      ];
      if (query) {
        pepline.splice(pepline.length - 1, 0, {
          $match: { title: { $regex: query, $options: "i" } },
        });
      }
      const books = await Books.aggregate(pepline);
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: books,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "interval server error",
      });
    }
  }

  async getBookById(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "invalid object Id",
        });
      }
      const id = new mongoose.Types.ObjectId(req.params.id);
      const books = await Books.aggregate([
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "authorInfo",
          },
        },
        {
          $unwind: { path: "$authorInfo", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "bookId",
            as: "orderInfo",
          },
        },

        {
          $unwind: { path: "$orderInfo", preserveNullAndEmptyArrays: true },
        },

        {
          $match: { _id: id },
        },

        {
          $project: {
            _id: 1,
            title: 1,
            author: 1,
            genre: 1,
            price: 1,
            author: "$authorInfo.name",
            order: "$orderInfo",
          },
        },
      ]);
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: books,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "interval server error",
      });
    }
  }

  async updateBook(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "invalid object id",
        });
      }
      const updatingBooks = await Books.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: updatingBooks,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "internal server error",
      });
    }
  }
  async deleteBook(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "invalid object id",
        });
      }
      const deletedBooks = await Books.findByIdAndDelete(id);

      if (!deletedBooks) {
        return res.status(404).json({
          statusCode: 404,
          message: "books not found",
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
