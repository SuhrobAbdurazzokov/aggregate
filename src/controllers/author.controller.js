import mongoose from "mongoose";
import Author from "../models/author.model.js";
import { AuthorValidation } from "../validations/author/author.validation.js";

const validator = new AuthorValidation();
export class AuthorController {
  async createAuthor(req, res) {
    try { 
      const { error, value } = validator.createAuthorValidation(req.body);
      if (error) {
        return res.status(422).json({
          statusCode: 422,
          message: "Invalid data",
          details: error.details,
        });
      }

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
        { $match: { _id: id } },
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
            books: "$bookInfo",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            country: 1,
            age: 1,
            books: 1,
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

      const { error, value } = validator.updateAuthorValidation(req.body);
      if (error) {
        return res.status(422).json({
          statusCode: 422,
          message: "Invalid data",
          details: error.details,
        });
      }

      const updatingAuthor = await Author.findByIdAndUpdate(id, value, {
        new: true,
      });

      if (!updatingAuthor) {
        return res.status(404).json({
          statusCode: 404,
          message: "author not found",
        });
      }

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
