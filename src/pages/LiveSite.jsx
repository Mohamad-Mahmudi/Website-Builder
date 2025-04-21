import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function LiveSite() {
  const { domain } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectByDomain = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          where("domain", "==", domain)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setProject(snapshot.docs[0].data());
        }
      } catch (err) {
        console.error("خطا در دریافت اطلاعات سایت:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectByDomain();
  }, [domain]);

  if (loading) return <p className="p-4">در حال بارگذاری...</p>;
  if (!project) return <p className="p-4">سایت موردنظر یافت نشد 😕</p>;

  return (
    <div className="min-h-screen p-8 bg-white text-center">
      <h1 className="text-3xl font-bold mb-8">{project.name}</h1>
      <div className="space-y-4">
        {project.elements?.map((el) => (
          <div key={el.id}>
            {el.type === "text" && (
              <p className="text-lg">{el.content}</p>
            )}
            {el.type === "button" && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                {el.content}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
