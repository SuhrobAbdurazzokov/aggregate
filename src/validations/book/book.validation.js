import Joi from "joi";

export class BookValidation {
  createBookValidation(data) {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        "string.base": "Title must be string",
        "string.empty": "Title is required",
      }),
      author: Joi.string().required().min(24).max(24).messages({
        "string.base": "Author must be Object id",
        "string.empty": "Author id (Object id) is reuired",
      }),

      genre: Joi.string()
        .valid("Drama", "Komediya", "Romantik", "Siyosiy", "Tarixiy")
        .required()
        .messages({
          "any.only":
            "Genre must be `Drama`, `Komediya`, `Romatik`, `Siyosiy` or `Tarixiy`",
          "string.empty": "Genre is required",
        }),

      price: Joi.number().required().messages({
        "number.base": "Price must be number",
        "number.empty": "Price is required",
      }),

      sold: Joi.number().required().messages({
        "number.base": "Sold must be number",
        "number.empty": "Sold is required",
      }),

      stock: Joi.number().required().messages({
        "number.base": "Stock must be number",
        "number.empty": "Stock is required",
      }),
    });

    return schema.validate(data);
  }

  updateBookValidation(data) {
    const schema = Joi.object({
      title: Joi.string().optional().messages({
        "string.base": "Title must be string",
        "string.empty": "Title is required",
      }),
      author: Joi.string().optional().min(24).max(24).messages({
        "string.base": "Author must be Object id",
        "string.empty": "Author id (Object id) is reuired",
      }),

      genre: Joi.string()
        .valid("Drama", "Komediya", "Romantik", "Siyosiy", "Tarixiy")
        .required()
        .messages({
          "any.only":
            "Genre must be `Drama`, `Komediya`, `Romatik`, `Siyosiy` or `Tarixiy`",
          "string.empty": "Genre is required",
        }),

      price: Joi.number().optional().messages({
        "number.base": "Price must be number",
        "number.empty": "Price is required",
      }),

      sold: Joi.number().optional().messages({
        "number.base": "Sold must be number",
        "number.empty": "Sold is required",
      }),

      stock: Joi.number().optional().messages({
        "number.base": "Stock must be number",
        "number.empty": "Stock is required",
      }),
    });

    return schema.validate(data);
  }
}
