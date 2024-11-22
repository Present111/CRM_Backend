const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerDocs = require("./swagger");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Sử dụng FRONTEND_URL từ .env
const FRONTEND_URL = process.env.FRONTEND_URL;

// Cấu hình CORS
app.use(
  cors({
    origin: FRONTEND_URL, // Địa chỉ frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức được phép
    credentials: true, // Nếu bạn sử dụng cookie hoặc header xác thực
  })
);

// Middleware
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/deals", require("./routes/dealRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
