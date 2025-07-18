import { Schema, model } from "mongoose";

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String },
    age: { type: Number },
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
  },
  { timestamps: true, versionKey: false }
);

export default model("Authors", AuthorSchema);
