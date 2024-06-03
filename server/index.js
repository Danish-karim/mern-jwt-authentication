const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/userRoutes");
require("dotenv").config();
const PORT = 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
mongoose
  .connect(
    "mongodb+srv://admin:LGQXHhKEWnrbTKAx@cluster0.hdh1yrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("error", err);
  });

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
