import Joi from "joi";

export class AuthorValidation {
  constructor() {
    this.phoneNumberRegex =
      /^(\+998|998)?[\s\-]?([0-9]{2})[\s\-]?([0-9]{3})[\s\-]?([0-9]{2})[\s\-]?([0-9]{2})$/;

    this.strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    this.countryRegex = /^[A-Z][a-zA-Z\s]*$/;
  }

  createAuthorValidation(data) {
    const schema = Joi.object({
      name: Joi.string().min(3).required().messages({
        "string.base": "Name must be string",
        "string.min": "Name is too short",
        "string.empty": "Name is required",
        "any.required": "Name is required",
      }),

      country: Joi.string().pattern(this.countryRegex).required().messages({
        "string.base": "Country must be string",
        "string.pattern.base": "Country's first letter should be capital",
        "string.empty": "Country is required",
        "any.required": "Country is required",
      }),

      age: Joi.number().integer().min(18).required().messages({
        "number.base": "Age must be number",
        "number.integer": "Age must be integer",
        "number.min": "Age must be at least 18",
        "any.required": "Age is required",
      }),

      phoneNumber: Joi.string()
        .pattern(this.phoneNumberRegex)
        .required()
        .messages({
          "string.base": "Phone number must be string",
          "string.pattern.base": "Invalid format of phone number",
          "string.empty": "Phone number is required",
          "any.required": "Phone number is required",
        }),

      email: Joi.string().email().required().messages({
        "string.base": "Email must be string",
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required",
      }),

      password: Joi.string()
        .pattern(this.strongPasswordRegex)
        .required()
        .messages({
          "string.base": "Password must be string",
          "string.pattern.base":
            "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character",
          "string.empty": "Password is required",
          "any.required": "Password is required",
        }),

      gender: Joi.string().valid("male", "female").required().messages({
        "any.only": "Gender must be either 'male' or 'female'",
        "string.empty": "Gender is required",
        "any.required": "Gender is required",
      }),
    });

    return schema.validate(data);
  }

  updateAuthorValidation(data) {
    const schema = Joi.object({
      name: Joi.string().min(3).optional().messages({
        "string.base": "Name must be string",
        "string.min": "Name is too short",
      }),

      country: Joi.string().pattern(this.countryRegex).optional().messages({
        "string.base": "Country must be string",
        "string.pattern.base": "Country's first letter should be capital",
      }),

      age: Joi.number().integer().min(18).optional().messages({
        "number.base": "Age must be number",
        "number.integer": "Age must be integer",
        "number.min": "Age must be at least 18",
      }),

      phoneNumber: Joi.string()
        .pattern(this.phoneNumberRegex)
        .optional()
        .messages({
          "string.base": "Phone number must be string",
          "string.pattern.base": "Invalid format of phone number",
        }),

      email: Joi.string().email().optional().messages({
        "string.base": "Email must be string",
        "string.email": "Invalid email format",
      }),

      password: Joi.string()
        .pattern(this.strongPasswordRegex)
        .optional()
        .messages({
          "string.base": "Password must be string",
          "string.pattern.base":
            "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character",
        }),

      gender: Joi.string().valid("male", "female").optional().messages({
        "any.only": "Gender must be either 'male' or 'female'",
      }),
    });

    return schema.validate(data);
  }
}
