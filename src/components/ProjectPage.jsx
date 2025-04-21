import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject(docSnap.data());
      }
    };
    fetchProject();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p className="text-gray-600">Domain: {project.domain}</p>
    </div>
  );
}
