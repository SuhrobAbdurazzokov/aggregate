import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "Books" },
    quantity: { type: Number },
    totalPrice: { type: Number },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

export default model("Orders", OrderSchema);
