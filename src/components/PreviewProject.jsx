// src/components/PreviewProject.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import LivePreview from "./LivePreview";  // فرض بر این است که این کامپوننت قبلاً ایجاد شده است

export default function PreviewProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const ref = doc(db, "projects", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setProject(snapshot.data());
        } else {
          console.error("Project not found");
        }
      } catch (error) {
        console.error("Error loading project:", error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <p>در حال بارگذاری...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      
      {/* پیش‌نمایش از عناصر */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl mb-2">پیش‌نمایش صفحه وب:</h2>
        <LivePreview elements={project.elements || []} />
      </div>
      
      {/* دکمه انتشار */}
      <div className="mt-4">
        <button
          onClick={() => alert("سایت منتشر شد!")}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          انتشار سایت
        </button>
      </div>
    </div>
  );
}