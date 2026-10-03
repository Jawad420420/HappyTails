import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import adoptionRoutes from "./routes/adoptionRoutes.js";
import vaccinationRoutes from "./routes/vaccinationRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import {
  carbonTracker,
  carbonStats,
} from "./middleware/carbonTracker.js";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(carbonTracker);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/vaccinations", vaccinationRoutes);
app.use("/api/volunteers", volunteerRoutes); 
app.use("/api/tasks", taskRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas database");
  } catch (err) {
    console.log(`Error connecting to database ${err}`);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("HappyTails API is running");
});


app.get("/api/carbon-stats", (req, res) => {
  res.json({
    totalRequests: carbonStats.requests,
    totalBytes: carbonStats.totalBytes,
    totalCO2Grams: Number(carbonStats.totalCO2.toFixed(6)),
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});