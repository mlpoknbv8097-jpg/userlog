import express from "express";
import mongoose from "mongoose";
import path from "path";
import MyModel from "./models/MySchema.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

app.post("/", (req, res) => {
  console.log(req.body);
  const Mydata = new MyModel(req.body);
  Mydata.save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log("Failed to save data", err.message);
    });
});

app.get("/index.html", (req, res) => {
  res.send("<h1>تم ارسال البيانات بي نجاخ </h1>");
});

mongoose
  .connect("mongodb://admin:admin@localhost:27017/myapp?authSource=admin")
  .then(() => {
    app.listen(3000, () => {
      console.log(`http://localhost:${3000}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB:", err.message);
  });
