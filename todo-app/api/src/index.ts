import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import crypto from "crypto";
import cors from "cors";
import { configDotenv } from "dotenv";
import {AuthRouter} from "./routes/authenticate"
import todoRouter from "./routes/todo";
const app = express();
const port = 3000;
configDotenv();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI as string)
  .then(() => {
    console.log("Mongo DB connected successfully");
  })
  .catch((error) => console.log("Error in connecting mongo DB", error));

  app.use("/api-v1/auth", AuthRouter);

  app.use("/api-v1/todos", todoRouter)

  app.get("/test", (req, res) => {
    res.status(200).send("hello")
  })


  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
  });