import { Schema, model } from "mongoose";

const BookSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: Schema.Types.ObjectId, ref: "authors" },
    genre: { type: String },
    price: { type: Number },
    sold: { type: Number },
    stock: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

export default model("Books", BookSchema);
