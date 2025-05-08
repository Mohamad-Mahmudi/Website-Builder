import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import axios from "axios";

const router = express.Router();

// 👉 ثبت‌نام کاربر
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("📩 Register Request:", req.body);

  if (!name || !email || !password) {
    console.warn("⚠️ فیلدهای ناقص");
    return res.status(400).json({ message: "لطفاً همه فیلدها را وارد کنید" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn("⚠️ کاربر قبلاً ثبت شده:", existingUser.email);
      return res.status(409).json({ message: "کاربر قبلاً ثبت‌نام کرده است" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ JWT_SECRET تعریف نشده است");
      return res.status(500).json({ message: "مشکل در تنظیمات سرور" });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1d" });

    console.log("✅ ثبت‌نام موفق:", user.email);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ خطا در ثبت‌نام:", err.message, "\n", err.stack);
    res.status(500).json({ message: "خطا در ثبت‌نام" });
  }
});

// 👉 ورود کاربر
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login Request:", req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "همه فیلدها الزامی هستند" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.warn("❌ کاربر یافت نشد:", email);
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("❌ رمز عبور نادرست برای:", email);
      return res.status(401).json({ message: "رمز عبور نادرست است" });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1d" });

    console.log("✅ ورود موفق:", user.email);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ خطا در ورود:", err);
    res.status(500).json({ message: "خطا در ورود" });
  }
});

export default router;
export const register = (data) => {
  return axios.post("http://localhost:5000/api/auth/register", data, {
    withCredentials: true,
  });
};