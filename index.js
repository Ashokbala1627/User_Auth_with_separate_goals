const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongodb connection
const uri = process.env.MONGO_URI;
const port = process.env.PORT;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

connectToDatabase();

//routes

app.use("/api/goals", require("./routes/goalRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

//server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
