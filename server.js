// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./server/routes/auth.js";

dotenv.config();

// بررسی متغیرهای محیطی
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT || 5000;

if (!mongoUri || !jwtSecret) {
  console.error("❌ MONGO_URI یا JWT_SECRET در فایل .env تعریف نشده‌اند");
  process.exit(1);
}

const app = express();

// میدلورها
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// اتصال به MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // کاهش زمان انتظار برای اتصال
})
  .then(() => {
    console.log("✅ MongoDB connected");

    // مسیرهای API
    app.use("/api/auth", authRoutes);

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
