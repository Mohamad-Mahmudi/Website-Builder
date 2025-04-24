// src/components/PublishProject.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function PublishProject({ projectId, domain }) {
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    setPublishing(true);
    try {
      // فرض می‌کنیم که لینک سایت با دامنه جدید منتشر میشه
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, {
        published: true,
        publishedAt: new Date(),
      });

      // پس از انتشار به صفحه پروژه منتقل می‌شویم
      navigate(`/project/${projectId}`);
    } catch (err) {
      console.error("Error publishing project:", err);
      setError("خطا در انتشار پروژه. لطفاً دوباره تلاش کنید.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handlePublish}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        disabled={publishing}
      >
        {publishing ? "در حال انتشار..." : "انتشار پروژه"}
      </button>
    </div>
  );
}