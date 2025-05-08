// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
// import { signOut } from "firebase/auth";
// import { auth, db } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import Layout from "../components/Layout";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchProjects = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("userToken");
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("مشکلی در خروج پیش آمد. لطفا دوباره تلاش کنید.")
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

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
      // Refresh project list
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
    } catch (error) {
      console.error("Error creating project:", error);
      alert("مشکلی پیش آمد، لطفا دوباره تلاش کنید.");
    }
  };

  if (!currentUser) return null;

  return (
    <Layout>
      <div className="p-6 space-y-8">
        {/* هدر داشبورد */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">👋 خوش اومدی!</h1>
            <p>
              ورود با ایمیل: <strong>{currentUser?.email}</strong>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
          >
            خروج
          </button>
        </div>

        {/* لیست پروژه‌ها */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">وبسایت‌های شما</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              + ساخت وبسایت جدید
            </button>
          </div>

          {loading ? (
            <p>در حال بارگذاری پروژه‌ها...</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
              {projects.length === 0 ? (
                <p className="text-gray-500">هیچ پروژه‌ای هنوز ندارید.</p>
              ) : (
                projects.map((project) => (
                  <Link
                    to={`/project/${project.id}/builder`}
                    key={project.id}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-lg block transition duration-300"
                  >
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className="text-sm text-gray-500 mt-2">{project.domain}</p>
                  </Link>
                ))
              )}
            </div>
          )}
        </section>

        {/* فرم ساخت پروژه جدید */}
        {showForm && (
          <section className="bg-white p-6 rounded-xl shadow max-w-md space-y-4">
            <h3 className="text-xl font-bold">ساخت وبسایت جدید</h3>
            <input
              type="text"
              placeholder="نام وبسایت را وارد کنید"
              className="w-full p-3 border rounded-xl"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={handleCreateProject}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
              >
                ساختن
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded-xl"
              >
                انصراف
              </button>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}