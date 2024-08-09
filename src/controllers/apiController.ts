import { Request, Response } from "express";
import { createResponse } from "../utils/responseHelpers";
import API from "../models/apiSchema";
import path from "path";
import fs from "fs";

const createAPI = async (req: Request, res: Response) => {
  const { userId, name, description } = req.body;

  // Validate required fields
  if (!userId || !name || !description) {
    return res.status(400).json(
      createResponse({
        success: false,
        status: 400,
        message:
          "User ID, name, and description are required to create a new API.",
      })
    );
  }

  try {
    // Create a new API document in MongoDB
    const newAPI = new API({
      userId,
      name,
      description,
    });

    // Save the API to the database
    const savedAPI = await newAPI.save();

    // Generate a unique file name for the API (using the MongoDB-generated _id)
    const apiId = savedAPI._id.toString();
    const filePath = path.join(__dirname, "..", "routes", "api", `${apiId}.ts`);

    // Create the directory and file if it doesn't exist
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, `// Code belongs to ${userId}`);

    return res.status(201).json(
      createResponse({
        success: true,
        status: 201,
        message: "API created successfully",
        data: savedAPI,
      })
    );
  } catch (error: any) {
    console.error("Error creating API:", error);
    return res.status(500).json(
      createResponse({
        success: false,
        status: 500,
        message: "Internal Server Error",
        errors: { error: error.message },
      })
    );
  }
};

export { createAPI };
