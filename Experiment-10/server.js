/**
 * server.js
 * Main entry point for the Student CRUD REST API
 * Experiment 10 - Node.js + Express.js + MongoDB
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import student routes
const studentRoutes = require("./routes/studentRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
//  Middleware
// ─────────────────────────────────────────────

// Enable CORS so the API can be accessed from any origin
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ─────────────────────────────────────────────
//  MongoDB Connection
// ─────────────────────────────────────────────

// Replace with your MongoDB Atlas URI or use local MongoDB
const MONGO_URI = "mongodb://127.0.0.1:27017/studentDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Stop the server if DB connection fails
  });

// ─────────────────────────────────────────────
//  Routes
// ─────────────────────────────────────────────

// Mount student routes under /api/students
app.use("/api/students", studentRoutes);

// Root endpoint — health check
app.get("/", (req, res) => {
  res.json({
    message: "🎓 Student CRUD API is running!",
    endpoints: {
      getAllStudents: "GET    /api/students",
      getStudentById: "GET    /api/students/:id",
      createStudent: "POST   /api/students",
      updateStudent: "PUT    /api/students/:id",
      deleteStudent: "DELETE /api/students/:id",
    },
  });
});

// 404 handler — catches any undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler — catches any unhandled errors
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// ─────────────────────────────────────────────
//  Start Server
// ─────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
