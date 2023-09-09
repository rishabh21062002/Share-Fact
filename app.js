import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { createFact, getFact, updateFact } from "./controllers/facts.js";
import dotenv from "dotenv";
// import ejs from "ejs";
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors);
app.set("view engine", "ejs");
app.use(express.static("public"));

// let list = [];

app.post("/facts", createFact);
app.patch("/", updateFact);
app.get("/", getFact);

// app.get("/", function (req, res) {

//   res.render("index");
// });

const url = process.env.MONGO_URL;
const PORT = process.env.PORT;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(PORT));
  })
  .catch((error) => console.log(error));
