import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import LivePreview from "../components/LivePreview";

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
        console.error("خطا در دریافت پروژه:", err);
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
      <LivePreview elements={project.elements || []} />
    </div>
  );
}