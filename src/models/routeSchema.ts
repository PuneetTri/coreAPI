import mongoose from "mongoose";

// Define the Route schema
const routeSchema = new mongoose.Schema(
  {
    apiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "API", // Reference to the API model
      required: true,
    },
    method: {
      type: String,
      required: true,
      enum: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Limit to HTTP methods
    },
    endpoint: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String, // Store the code as a string, adjust type if necessary
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Route = mongoose.model("Route", routeSchema);

export default Route;
