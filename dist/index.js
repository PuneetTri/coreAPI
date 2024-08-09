"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libraries
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// Controllers
const apiController_1 = require("./controllers/apiController");
const routeController_1 = require("./controllers/routeController");
// Setup config
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connect to MongoDB
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
// Routes
app.post("/new/api", apiController_1.createAPI);
app.post("/new/route", routeController_1.createRoute);
// Central router
const routes_1 = __importDefault(require("./routes"));
app.use("/api", routes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
