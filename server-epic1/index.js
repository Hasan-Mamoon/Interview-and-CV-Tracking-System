import "./db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { applicantrouter } from "./routes/applicantdata.js";
import { useRouter } from "./routes/userRoutes.js";
import { meetingRouter } from "./routes/meetingRoutes.js";
import { sdk, httpRequestCounter, errorCounter, latencyHistogram } from './telemetry.js';

dotenv.config();
const app = express();

// Basic middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// Handle Preflight Requests (OPTIONS)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// --- Telemetry Middleware ---
app.use((req, res, next) => {
  const start = process.hrtime();

  // Normalize path to reduce label cardinality
  const routePath = req.route?.path || req.path.split("?")[0];

  httpRequestCounter.add(1, {
    method: req.method,
    path: routePath,
  });

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds + nanoseconds / 1e9;

    latencyHistogram.record(duration, {
      method: req.method,
      path: routePath,
      status: res.statusCode,
    });

    if (res.statusCode >= 400) {
      errorCounter.add(1, {
        method: req.method,
        path: routePath,
        status: res.statusCode,
      });
    }
  });

  next();
});

// Routes
app.use("/auth", authRouter);
app.use("/user", useRouter);
app.use("/appdata", applicantrouter);
app.use("/meetings", meetingRouter);

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down successfully'))
    .catch((error) => console.error('Error shutting down OpenTelemetry SDK', error))
    .finally(() => process.exit(0));
});

// Start OpenTelemetry and server
const startServer = async () => {
  try {
    await sdk.start();
    console.log('OpenTelemetry SDK started');

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start OpenTelemetry SDK', error);
    process.exit(1);
  }
};

startServer();

