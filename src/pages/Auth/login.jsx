import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api"; // axios instance

export default function Login() {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      const { token } = res.data;

      login(token); // ذخیره توکن و بروزرسانی context

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("ایمیل یا رمز عبور اشتباه است.");
      } else {
        setError("مشکلی پیش آمد، لطفا دوباره تلاش کنید.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">ورود به حساب کاربری</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-xl text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          حساب نداری؟{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            ثبت‌نام کن
          </Link>
        </p>
      </div>
    </div>
  );
}