import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function CreateProject() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // برای نمایش خطا

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("لطفاً نام پروژه را وارد کنید.");
      return;
    }
    
    // اگر دامنه خالی است، به صورت خودکار دامنه بسازیم
    const generatedDomain = domain || `${name.toLowerCase().replace(/\s+/g, "-")}.dimawebsites.com`;

    setLoading(true);
    setError(""); // قبل از شروع عملیات خطا را پاک می‌کنیم
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        name,
        domain: generatedDomain,  // دامنه ایجاد شده
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        elements: [],
      });
      navigate(`/project/${docRef.id}/builder`);
    } catch (err) {
      console.error("خطا در ساخت پروژه:", err);
      setError("مشکلی پیش آمد! لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">🎯 ساخت پروژه جدید</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* نمایش خطا */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="نام پروژه"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="دامنه اختصاصی (مثلاً mysite)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "در حال ساخت..." : "🚀 ساخت پروژه"}
          </button>
        </form>
      </div>
    </div>
  );
}