import "dotenv/config";
import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import routes from "./routes/index";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

const port = 4000;

app.get("/", (req, res) => {
  res.send("Welcome! Head to /products to get all products");
});
app.use("/api", routes);

app.listen(port, async () => {
  console.log(`App server listening on port ${port}`);
});
