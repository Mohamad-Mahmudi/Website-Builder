import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";

export default function ProjectBuilder() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // گرفتن اطلاعات پروژه از Firestore
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, "projects", projectId);
        const projectSnap = await getDoc(projectRef);
        if (projectSnap.exists()) {
          setProject({ id: projectSnap.id, ...projectSnap.data() });
        } else {
          console.error("پروژه پیدا نشد");
        }
      } catch (err) {
        console.error("خطا در دریافت اطلاعات پروژه:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) return <div className="p-8 text-center">⏳ در حال بارگذاری...</div>;

  if (!project) return <div className="p-8 text-center text-red-500">❌ پروژه پیدا نشد!</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          🛠 طراحی پروژه: {project.name}
        </h1>

        <p className="text-gray-600 mb-6">دامنه: {project.domain}</p>

        {/* 🔧 اینجا ابزار طراحی قرار می‌گیره */}
        <div className="border-2 border-dashed border-gray-400 p-10 text-center text-gray-500 rounded-xl">
          <p>📐 ابزار طراحی اینجاست</p>
          <p className="text-sm mt-2">اینجا می‌تونی المنت‌ها، تصاویر، دکمه و ... اضافه کنی.</p>
        </div>

        {/* در آینده: افزودن دکمه ذخیره، پیش‌نمایش، بک‌اند ذخیره المنت‌ها و غیره */}
      </div>
    </div>
  );
}