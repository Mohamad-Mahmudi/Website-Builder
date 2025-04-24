// src/components/AddPage.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function AddPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddPage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ref = doc(db, "projects", id);
      await updateDoc(ref, {
        elements: [
          ...project.elements,
          {
            title,
            content,
            createdAt: new Date(),
          },
        ],
      });
      navigate(`/project/${id}`);
    } catch (error) {
      console.error("Error adding page:", error);
      setError("خطا در اضافه کردن صفحه.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">اضافه کردن صفحه جدید</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleAddPage} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">عنوان صفحه:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">محتوای صفحه:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded"
            rows="5"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "در حال اضافه کردن..." : "اضافه کردن صفحه"}
        </button>
      </form>
    </div>
  );
}