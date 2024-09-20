// backend\src\app.ts
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import songRoutes from "./routes/songRoutes";
import artistRoutes from "./routes/artistRoutes";
import albumRoutes from "./routes/albumRoutes";
import genreRoutes from "./routes/genreRoutes";
import statisticsRoutes from "./routes/statisticsRoutes";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import cors from "cors";

const app = express();

app.use(cors({
  origin: '*', // or specify your frontend URL if security is a concern
}));




// Middleware to parse JSON bodies
app.use(express.json({ limit: "10kb" }));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// Notify users to use the frontend entry point
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(`
    <h1>Welcome to Music App API Developed by Mulugeta Linger!</h1>
    <p>Please visit our frontend application at <a href="https://eclectic-croquembouche-8330e2.netlify.app/" target="_blank">https://eclectic-croquembouche-8330e2.netlify.app/</a> to use the full application.</p>
    <p>API Documentation is available at the respective endpoints:</p>
    <ul>
      <li><a href="/api/v1/songs">Songs API</a></li>
      <li><a href="/api/v1/artists">Artists API</a></li>
      <li><a href="/api/v1/albums">Albums API</a></li>
      <li><a href="/api/v1/genres">Genres API</a></li>
      <li><a href="/api/v1/statistics">Statistics API</a></li>


    </ul>
  `);
});
// Routes
app.use("/api/v1/songs", songRoutes);
app.use("/api/v1/artists", artistRoutes);
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
