import { Schema, model } from "mongoose";

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String },
    age: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

export default model("Authors", AuthorSchema);
