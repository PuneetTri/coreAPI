import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Adjust the path to point to the correct 'routes' directory
const routesDir = path.join(__dirname, "..", "routes", "api");

console.log(routesDir);

// Create the routes directory if it doesn't already exist
if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir, { recursive: true });
}

// Read all route files and add them to the router
fs.readdirSync(routesDir).forEach(async (file) => {
  if (file.endsWith(".ts")) {
    try {
      const routePath = path.join(routesDir, file);
      // Dynamically import the route file
      const routeModule = await import(routePath);
      const route = routeModule.default;

      // Derive API ID from file name
      const apiId = file.replace(".ts", "");

      // Use the route with a base path of /apiId
      router.use(`/${apiId}`, route);
    } catch (error) {
      console.error(`Error loading route ${file}:`, error);
    }
  }
});

export default router;
