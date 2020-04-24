const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// importing post route
const postsRouter = require("./routes/posts");

app.use("/posts", postsRouter);

mongoose.connect(
  process.env.DB_CONNECTION_TWO,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to mongodb");
  }
);

app.get("/", function (req, res) {
  res.send("welcome to home");
});

app.listen(3000, () => {
  console.log("server started listening to port 3000");
});
