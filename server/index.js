const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5050;
const dotenv = require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/api/v1", require("./src/v1/routes"));

app.get("/", (req, res) => {
  res.send("Hello express");
});

//connect DB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中・・・");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・・・");
});
