import { connect } from "mongoose";
import { config } from "dotenv";
import consola from "consola";

config();

export const connectdb = async () => {
  try {
    await connect(process.env.MONGO_URI);
    consola.success("Connected to database");
  } catch (error) {
    consola.error(`error in connected db:${error.message}`);
    process.exit(1);
  }
};
