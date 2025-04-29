import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // آدرس سرور
});

// ثبت نام
export const register = (formData) => API.post("/register", formData);

// لاگین
export const login = (formData) => API.post("/login", formData);