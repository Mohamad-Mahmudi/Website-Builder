// src/components/ProjectList.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ProjectList() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (err) {
        setError("خطا در بارگذاری پروژه‌ها.");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">پروژه‌های من</h1>
      <ul className="space-y-4">
        {projects.length === 0 ? (
          <p>هیچ پروژه‌ای پیدا نشد!</p>
        ) : (
          projects.map((project) => (
            <li key={project.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-xl">{project.name}</h3>
                  <p className="text-gray-600">{project.domain}</p>
                </div>
                <div className="space-x-2">
                  <Link
                    to={`/project/${project.id}/builder`}
                    className="text-blue-600 hover:underline"
                  >
                    ویرایش
                  </Link>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(project.id)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((project) => project.id !== id));
    } catch (err) {
      setError("خطا در حذف پروژه.");
      console.error("Error deleting project:", err);
    }
  }
}