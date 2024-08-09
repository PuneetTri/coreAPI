import { Request, Response } from "express";
import { createResponse } from "../utils/responseHelpers";
import API from "../models/apiSchema.model";
import Route from "../models/routeSchem.model";

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

    // Check if an route already exists with the same endpoint and method
    const routeExists = await Route.findOne({ endpoint, method });

    if (routeExists) {
      return res.status(400).json(
        createResponse({
          success: false,
          status: 400,
          message: "A route already exists with the given endpoint and method.",
        })
      );
    }

    // Save the Route to the database
    const savedRoute = await newRoute.save();

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
