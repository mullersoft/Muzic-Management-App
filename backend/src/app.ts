import express, { Request, Response, NextFunction } from "express";
import path from "path";
import songRoutes from "./routes/songRoutes";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: "10kb" }));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/v1/songs", songRoutes);

// Handling unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Global error handling middleware
app.use(globalErrorHandler);

export default app;
