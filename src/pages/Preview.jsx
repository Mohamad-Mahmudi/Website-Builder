import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Preview() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const ref = doc(db, "projects", id);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setProject(snapshot.data());
        }
      } catch (err) {
        console.error("خطا در دریافت پروژه برای پیش‌نمایش:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <p className="p-4">در حال بارگذاری...</p>;
  if (!project) return <p className="p-4">پروژه‌ای پیدا نشد.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">👀 پیش‌نمایش سایت: {project.name}</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto space-y-4">
        {project.elements?.map((el) =>
          el.type === "text" ? (
            <p key={el.id} className="text-lg text-gray-800">
              {el.content}
            </p>
          ) : (
            <button
              key={el.id}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow"
            >
              {el.content}
            </button>
          )
        )}
      </div>
    </div>
  );
}
