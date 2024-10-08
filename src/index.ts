// Libraries
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Controllers
import { createAPI } from "./controllers/api.controller";
import { createRoute } from "./controllers/route.controller";

// Middleware
import dynamicRouter from "./middleware/dynamicRouter.middleware";

// Setup config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.post("/new/api", createAPI);
app.post("/new/route", createRoute);

// Dynamically capture all the api requests made on /api
app.use("/api", dynamicRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
