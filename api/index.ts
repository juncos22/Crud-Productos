import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import productsRoute from "./routes/products.route";
import categoriesRoute from "./routes/categories.route";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", productsRoute);
app.use("/api/categories", categoriesRoute);

app.listen(port, async () => {
  console.log("Server listening on port: " + port);
});
