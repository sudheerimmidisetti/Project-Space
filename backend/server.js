const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const normalizeOrigin = (value = "") => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return new URL(trimmed).origin;
    }
  } catch (error) {
    return trimmed.replace(/\/$/, "");
  }

  return trimmed.replace(/\/$/, "");
};

const parseOrigins = (value = "") => {
  return value
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean)
    .map((origin) => origin.replace(/\/$/, ""));
};

const allowedOrigins = Array.from(
  new Set(
    [
      ...parseOrigins(process.env.ALLOWED_ORIGINS),
      normalizeOrigin(process.env.FRONTEND_URL || ""),
    ].filter(Boolean),
  ),
);

if (process.env.NODE_ENV !== "production" && allowedOrigins.length === 0) {
  allowedOrigins.push(
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
  );
}

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  if (err && err.message && err.message.startsWith("CORS blocked")) {
    return res.status(403).json({ message: err.message });
  }

  return next(err);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start Server
    app.listen(PORT, HOST, () => {
      console.log(`Server running on ${HOST}:${PORT}`);
      if (allowedOrigins.length > 0) {
        console.log("Allowed CORS origins:", allowedOrigins.join(", "));
      }
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
