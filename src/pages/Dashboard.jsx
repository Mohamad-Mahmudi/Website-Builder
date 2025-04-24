import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import Layout from "../components/Layout";

// کامپوننت SomePage
export function SomePage() {
  return (
    <Layout>
      <h1>صفحه‌ی من</h1>
      <p>این یه متن ساده‌ست.</p>
    </Layout>
  );
}

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // گرفتن پروژه‌ها از Firestore
  const fetchProjects = async () => {
    if (!currentUser) return;

    const q = query(
      collection(db, "projects"),
      where("owner", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, [currentUser]);

  const handleCreateProject = async () => {
    if (!newProjectName) return;

    const domain =
      newProjectName.toLowerCase().replace(/\s+/g, "-") + ".dimawebsites.com";

    try {
      await addDoc(collection(db, "projects"), {
        name: newProjectName,
        domain,
        owner: currentUser.uid,
      });
      setNewProjectName("");
      setShowForm(false);
      fetchProjects(); // بروزرسانی لیست پروژه‌ها بدون بارگذاری مجدد صفحه
    } catch (error) {
      console.error("Error creating project: ", error);
      alert("مشکلی پیش آمد، لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">👋 Welcome!</h1>
          <p>
            You are logged in as <strong>{currentUser?.email}</strong>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Websites</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            + New Website
          </button>
        </div>

        {/* لیست پروژه‌ها */}
        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
          {projects.length === 0 && (
            <p className="text-gray-500">You don’t have any projects yet.</p>
          )}

          {projects.map((project) => (
            <Link
              to={`/project/${project.id}/builder`}
              key={project.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg block"
            >
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{project.domain}</p>
            </Link>
          ))}
        </div>

        {/* فرم ساخت پروژه جدید */}
        {showForm && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow space-y-4 max-w-md">
            <h3 className="text-xl font-bold">Create New Website</h3>
            <input
              type="text"
              placeholder="Enter website name"
              className="w-full p-3 border rounded-xl"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={handleCreateProject}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
              >
                Create
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}