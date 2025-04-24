// src/components/EditProject.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [saving, setSaving] = useState(false); // State to handle saving status

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const ref = doc(db, "projects", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setProject(snapshot.data());
          setName(snapshot.data().name);
          setDomain(snapshot.data().domain);
        } else {
          console.error("Project not found");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error loading project:", error);
        setError("خطا در بارگذاری پروژه.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  // Handle form submission to save changes
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name.trim()) {
      setError("لطفاً نام پروژه را وارد کنید.");
      return;
    }
    if (!domain.trim()) {
      setError("لطفاً دامنه را وارد کنید.");
      return;
    }

    // Validate domain format
    const domainPattern = /^[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})$/;
    if (!domainPattern.test(domain)) {
      setError("لطفاً دامنه معتبر وارد کنید.");
      return;
    }

    setSaving(true);
    setError(""); // Clear previous errors

    try {
      const ref = doc(db, "projects", id);
      await updateDoc(ref, {
        name,
        domain,
      });
      navigate(`/project/${id}`);
    } catch (error) {
      console.error("Error saving project:", error);
      setError("خطا در ذخیره پروژه.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>در حال بارگذاری...</p>; // Loading state for project data
  if (error) return <p className="text-red-500">{error}</p>; // Display error message

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">ویرایش پروژه</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">نام پروژه:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">دامنه:</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="مثلاً mysite.com"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
}