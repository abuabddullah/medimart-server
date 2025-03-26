import cookieParser from "cookie-parser";
import cors from "cors";

import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import config from "./config/config";
import { connectDB } from "./config/database";
import { errorHandler } from "./middlewares/error.middleware";
import { medicineRoutes } from "./modules/medicine/medicine.routes";
import { orderRoutes } from "./modules/order/order.routes";
import { paymentRoutes } from "./modules/payment/payment.routes";
import { prescriptionRoutes } from "./modules/prescription/prescription.routes";
import { userRoutes } from "./modules/user/user.routes";
import { reviewRoutes } from "./modules/reivew/review.routes";
import { newsletterRoutes } from "./modules/newsletter/newsletter.router";

const app = express();
const port = config.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Medimart API");
});

// 404 route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
