import express from "express";
import { createResponse } from "../utils/responseHelpers";
import Route from "../models/routeSchem.model";
import { executeCode } from "../utils/executeCode";

const router = express.Router();

// Middleware to handle dynamic routing
router.use(async (req, res, next) => {
  const urlSegments = req.url.split("/").filter(Boolean);

  const apiId = urlSegments[0]; // The first segment is the API ID
  const method = req.method; // HTTP method (GET, POST, etc.)
  const endpoint = `/${urlSegments.slice(1).join("/")}`; // Join the remaining segments for the endpoint

  if (!apiId || !method || !endpoint) {
    return res.status(400).json(
      createResponse({
        success: false,
        status: 400,
        message: "API ID, method, and endpoint are required to call a route.",
      })
    );
  }

  try {
    // Find the route based on apiId, method, and endpoint
    const route = await Route.findOne({ apiId, method, endpoint });

    if (!route) {
      return res.status(404).json(
        createResponse({
          success: false,
          status: 404,
          message: "Route not found.",
        })
      );
    }

    // Execute the stored code
    if (route.code) {
      try {
        await executeCode(req, res, route.code);
      } catch (error: any) {
        // Handle code execution errors
        return res.status(500).json(
          createResponse({
            success: false,
            status: 500,
            message: "An error occurred while executing the code.",
          })
        );
      }
    } else {
      return res.status(500).json(
        createResponse({
          success: false,
          status: 500,
          message: "No code found to execute for this route.",
        })
      );
    }
  } catch (error: any) {
    return res.status(500).json(
      createResponse({
        success: false,
        status: 500,
        message: "An error occurred while processing the route.",
      })
    );
  }
});

export default router;
