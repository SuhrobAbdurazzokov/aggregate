import { config } from "dotenv";
import consola from "consola";
import { connectdb } from "./db/index.js";
import app from "./app.js";

config();

await connectdb();

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  consola.success(`Server running on port: ${PORT}`);
});
