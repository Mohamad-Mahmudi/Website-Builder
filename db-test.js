// db-test.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // بارگذاری متغیرهای محیطی از .env

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI در فایل .env تعریف نشده است.");
  process.exit(1);
}

console.log("🔌 تلاش برای اتصال به MongoDB...");

mongoose.connection.on('error', err => {
  console.error("❌ اتصال MongoDB قطع شده:", err);
})
  .then(() => {
    console.log("✅ اتصال موفق به MongoDB");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ خطا در اتصال به MongoDB:", err.message);
    process.exit(1);
  });