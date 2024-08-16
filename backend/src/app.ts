import express, { Request, Response, NextFunction } from "express";
import path from "path";
import songRoutes from "./routes/songRoutes";
import artistRoutes from "./routes/artistRoutes";
import albumRoutes from "./routes/albumRoutes";
import genreRoutes from "./routes/genreRoutes";
import statisticsRoutes from "./routes/statisticsRoutes";
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
app.use("/api/v1/artists", artistRoutes);;
app.use("/api/v1/albums", albumRoutes);
app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/statistics", statisticsRoutes);


// Handling unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Global error handling middleware
app.use(globalErrorHandler);

export default app;
