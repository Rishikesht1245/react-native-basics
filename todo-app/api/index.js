import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import crypto from "crypto";
import cors from "cors";
import { configDotenv } from "dotenv";
import { error } from "console";

const app = express();
const port = 3000;
configDotenv();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongo DB connected successfully");
  })
  .catch((error) => console.log("Error in connecting mongo DB", error));


  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
  });