import rTracer from "cls-rtracer";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import morgan from "morgan";
import GlobalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import { stream } from "./shared/logger";
const app: Application = express();

export const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],

  // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware setup
app.use(cors(corsOptions));

app.use(morgan("combined", { stream }));
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(rTracer.expressMiddleware());

// Route handler for root endpoint
app.get("/", (_req: Request, res: Response) => {
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "Welcome to Server!",
  });
});

// Router setup
app.use("/api/v1", router);

// Error handling middleware
app.use(GlobalErrorHandler);

// Not found handler
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
