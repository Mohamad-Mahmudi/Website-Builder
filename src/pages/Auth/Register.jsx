import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { register } from "../../api/auth";
import { Link } from "react-router-dom";

export default function Register() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
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
    const formData ={name , email , password}
    console.log("sending from data" , formData)

    try {
      const res = await register(formData);
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        setError("این ایمیل قبلاً ثبت شده است.");
      } else {
        setError("ثبت‌نام ناموفق بود. لطفاً دوباره تلاش کنید.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">ثبت‌نام</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="نام کامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl"
            required
          />
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
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        حساب داری؟{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          وارد شو
        </Link>
      </p>
    </div>
  );
}