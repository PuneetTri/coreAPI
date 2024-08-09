import { Request, Response } from "express";
import { createResponse } from "../utils/responseHelpers";
import API from "../models/apiSchema";
import Route from "../models/routeSchema";
import path from "path";
import generateCode from "../utils/generateCode";
import fs from "fs";

const createRoute = async (req: Request, res: Response) => {
  const { apiId, method, endpoint, code, description } = req.body;

  // Validate required fields
  if (!apiId || !method || !endpoint || !code) {
    return res.status(400).json(
      createResponse({
        success: false,
        status: 400,
        message:
          "API ID, method, endpoint, and code are required to create a new route.",
      })
    );
  }

  try {
    // Check if the API exists
    const api = await API.findById(apiId);
    if (!api) {
      return res.status(404).json(
        createResponse({
          success: false,
          status: 404,
          message: "API not found.",
        })
      );
    }

    // Create a new Route document
    const newRoute = new Route({
      apiId,
      method,
      endpoint,
      code,
      description,
    });

    // Save the Route to the database
    const savedRoute = await newRoute.save();

    // Update the API route file
    const filePath = path.join(__dirname, "..", "routes", "api", `${apiId}.ts`);

    const routes = await Route.find({ apiId });

    // Generate the code
    const content = generateCode(routes);

    fs.writeFileSync(filePath, content);

    return res.status(201).json(
      createResponse({
        success: true,
        status: 201,
        message: "Route created successfully",
        data: savedRoute,
      })
    );
  } catch (error: any) {
    console.error("Error creating route:", error);
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

export { createRoute };
