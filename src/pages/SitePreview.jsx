// src/pages/SitePreview.jsx
import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { db } from "../firebase";
import LivePreview from "../components/LivePreview";

export default function SitePreview() {
  const { id } = useParams();
  const [elements, setElements] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const ref = doc(db, "projects", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setElements(snapshot.data().elements || []);
        } else {
          setElements(null);
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
  if (!elements) return <p className="p-4">سایت پیدا نشد.</p>;

  return (
    <div className="min-h-screen bg-white p-8">
      <LivePreview elements={elements} readonly />
    </div>
  );
}
