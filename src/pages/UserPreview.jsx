import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function UserPreview() {
  const { username } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          where("username", "==", username)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setProject(snapshot.docs[0].data());
        }
      } catch (err) {
        console.error("خطا در دریافت پروژه‌ی عمومی:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [username]);

  if (loading) return <p className="p-4">در حال بارگذاری...</p>;
  if (!project) return <p className="p-4">پروژه‌ای پیدا نشد.</p>;

  return (
    <div className="min-h-screen bg-white text-right p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {project.elements?.map((el) => {
          const styles = {
            color: el.styles?.color || "#000",
            backgroundColor: el.styles?.backgroundColor || "#fff",
            fontSize: el.styles?.fontSize || "16px",
            textAlign: el.styles?.textAlign || "right",
          };

          return (
            <div key={el.id} style={styles} className="p-4 border rounded-lg">
              {el.type === "text" && <p>{el.content}</p>}
              {el.type === "button" && (
                <button className="px-4 py-2 rounded" style={styles}>
                  {el.content}
                </button>
              )}
              {el.type === "image" && (
                <img src={el.content} alt="تصویر" className="rounded max-w-full" />
              )}
              {el.type === "video" && (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded"
                    src={el.content}
                    title="Video Preview"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
              {el.type === "form" && (
                <form className="space-y-2">
                  <input
                    type="text"
                    placeholder="نام شما"
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    placeholder="پیام شما"
                    className="w-full p-2 border rounded"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    ارسال
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}