// Libraries
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";

// Types
import { createResponse } from "./utils/responseHelpers";

// Setup config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

// Routes
app.post("/new", (req, res) => {
  const { apiId, method, endpoint, code } = req.body;

  if (!apiId || !method || !endpoint || !code) {
    return res.status(400).json(
      createResponse({
        success: false,
        status: 400,
        message: `Missing field`,
      })
    );
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
