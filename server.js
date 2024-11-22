const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerDocs = require("./swagger");
const swaggerUi = require("swagger-ui-express");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // Authentication routes
app.use("/api/users", require("./routes/userRoutes")); // User management routes

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
