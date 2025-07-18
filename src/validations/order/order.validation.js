import Joi from "joi";

export class OrderValidation {
  createOrderValidation(data) {
    const schema = Joi.object({
      bookId: Joi.string().required().min(24).max(24).messages({
        "string.base": "Book id must ber string( Object) id ",
        "string.empty": "Book id is required",
      }),

      quantity: Joi.number().min(1).required().messages({
        "number.base": "Quantity must ber number",
        "number.empty": "Quantity is required",
      }),

      //   totalPrice ni qo'shmadim, sababi u codeni o'zida avtomatichiskiy qo'shilad
      // Date ni ham qo'shmadim u yaratilgan vaqtni o'zi yozib qo'yadi
    });

    return schema.validate(data);
  }

  updateOrderValidation(data) {
    const schema = Joi.object({
      bookId: Joi.string().optional().min(24).max(24).messages({
        "string.base": "Book id must ber string( Object) id ",
        "string.empty": "Book id is required",
      }),

      quantity: Joi.number().min(1).optional().messages({
        "number.base": "Quantity must be number",
        "number.empty": "Quantity is required",
      }),
    });

    return schema.validate(data);
  }
}
