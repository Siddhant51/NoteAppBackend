const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(require("./routes"));

const middleware = (req, res, next) => {
  console.log("This is my Middleware");
  next();
};

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

const DB =
  "mongodb+srv://Siddhant:Siddhant@cluster0.s36geb7.mongodb.net/noteapp?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to Mongo DB");
  })
  .catch((err) => {
    console.log(err);
  });
