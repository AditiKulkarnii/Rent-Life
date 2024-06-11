const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const wishlistRoutes = require("./routes/wishlist");
const passport = require("passport");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const fs = require("fs");

// database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/rent-a-life")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use(express.json());

const port = process.env.PORT || 4000;
app.listen(port, console.log(`Listening on port ${port}...`));
