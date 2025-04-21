import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const ref = doc(db, "projects", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setProject({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.error("Project not found");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error loading project:", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="text-gray-600">Domain: {project.domain}</p>
      <p className="text-gray-500 mt-2">Project ID: {project.id}</p>
    </div>
  );
}
