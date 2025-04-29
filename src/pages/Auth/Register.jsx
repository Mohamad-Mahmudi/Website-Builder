// src/pages/Auth/Register.jsx

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Register() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard"); // اگه لاگین بود مستقیم ببرش داشبورد
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیست.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // ثبت نام موفق => بره داشبورد
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("ایمیل قبلاً ثبت شده است.");
      } else if (err.code === "auth/invalid-email") {
        setError("ایمیل وارد شده معتبر نیست.");
      } else if (err.code === "auth/weak-password") {
        setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      } else {
        setError("مشکلی پیش آمد، لطفا دوباره تلاش کنید.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">ثبت نام در سایت</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl"
            required
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl"
            required
          />
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-xl"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "در حال ثبت نام..." : "ثبت نام"}
        </button>
      </form>
    </div>
  );
}