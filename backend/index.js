import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import jwt from "jsonwebtoken";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
  req.setTimeout(120000, () => {
    console.log("Request timed out");
    res.status(408).json({ error: "Request Timeout" });
  });
  next();
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded; // Add the decoded user info to the request object
    next();
  });
};

// Test Route (No Authentication Required)
app.get("/", (_, res) => {
  return res.status(200).json({
    message: "I'm coming from backend",
    success: true,
  });
});

// Middlewares
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Set request timeout to 30 seconds
app.use((req, res, next) => {
  req.setTimeout(30000); // 30 seconds
  next();
});

// Secure API Endpoints
app.use("/api/v1/post", authenticateToken, postRoute);
app.use("/api/v1/message", authenticateToken, messageRoute);
app.use("/api/v1/user", userRoute);

// Start the Server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at port ${PORT}`);
});

