import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../api"; // axios instance

export default function Login() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard"); // اگر لاگین شده بود، مستقیم بفرست داشبورد
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", { email, password });

      const { token, user } = response.data;

      // ذخیره توکن در localStorage
      localStorage.setItem("token", token);

      // میتونی اینجا یوزر رو هم تو Context بزاری (بسته به AuthContext)

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("ایمیل یا رمز عبور اشتباه است.");
      } else {
        setError("مشکلی پیش آمد، لطفا دوباره تلاش کنید.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">ورود به حساب کاربری</h1>

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
        </div>

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
    </div>
  );
}