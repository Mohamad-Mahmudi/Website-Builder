import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function EditProject() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams(); // گرفتن شناسه پروژه از URL
  const [project, setProject] = useState(null);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(true);

  // بارگذاری اطلاعات پروژه
  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, "projects", projectId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const projectData = docSnap.data();
        if (projectData.owner === currentUser.uid) {
          setProject(projectData);
          setName(projectData.name);
          setDomain(projectData.domain);
        } else {
          alert("شما اجازه دسترسی به این پروژه را ندارید.");
          navigate("/dashboard");
        }
      } else {
        alert("پروژه یافت نشد!");
        navigate("/dashboard");
      }

      setLoading(false);
    };

    fetchProject();
  }, [projectId, currentUser, navigate]);

  // ارسال تغییرات به Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !domain) return alert("لطفاً نام و دامنه را وارد کنید.");

    try {
      const docRef = doc(db, "projects", projectId);
      await updateDoc(docRef, {
        name,
        domain,
      });
      alert("پروژه با موفقیت به‌روزرسانی شد.");
      navigate(`/project/${projectId}/builder`);
    } catch (err) {
      console.error("خطا در به‌روزرسانی پروژه:", err);
      alert("مشکلی پیش آمد!");
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">✏️ ویرایش پروژه</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="نام پروژه"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
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
            {loading ? "در حال به‌روزرسانی..." : "✏️ به‌روزرسانی پروژه"}
          </button>
        </form>
      </div>
    </div>
  );
}