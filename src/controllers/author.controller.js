import mongoose from "mongoose";
import Author from "../models/author.model.js";

export class AuthorController {
  async createAuthor(req, res) {
    try {
      const newAuthor = await Author.create(req.body);

      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: newAuthor,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "internal server error",
      });
    }
  }

  async getAllAuthors(_, res) {
    try {
      const authors = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "bookInfo",
          },
        },
        {
          $addFields: {
            bookCount: { $size: "$bookInfo" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            age: 1,
            country: 1,
            bookCount: 1,
          },
        },
      ]);

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: authors,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "internal server error",
      });
    }
  }

  async getAuthorById(req, res) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "invalid object id",
        });
      }
      const id = new mongoose.Types.ObjectId(req.params.id);
      const authors = await Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "bookInfo",
          },
        },
        {
          $unwind: { path: "$bookInfo", preserveNullAndEmptyArrays: true },
        },
        { $match: { _id: id } },
        {
          $project: {
            _id: 1,
            name: 1,
            country: 1,
            age: 1,
            books: "$bookInfo",
          },
        },
      ]);

      if (!authors || authors.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "author not found",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: authors[0],
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "internal server error",
      });
    }
  }

  async updateAuthor(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "invalid object id",
        });
      }
      const updatingAuthor = await Author.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: updatingAuthor,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: error.message || "internal server error",
      });
    }
  }
  async deleteAuthor(req, res) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          statusCode: 400,
          message: "invalid object id",
        });
      }
      const deletedAuthor = await Author.findByIdAndDelete(id);

      if (!deletedAuthor) {
        return res.status(404).json({
          statusCode: 404,
          message: "author not found",
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
