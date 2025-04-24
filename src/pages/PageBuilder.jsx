// src/pages/PageBuilder.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import LivePreview from "../components/preview/LivePreview";
import StyleEditor from "../components/StyleEditor";

export default function PageBuilder() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const ref = doc(db, "projects", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProject(snap.data());
        setElements(snap.data().elements || []);
      }
    };
    fetchProject();
  }, [id]);

  const addElement = (type) => {
    const newElement = {
      id: Date.now().toString(),
      type,
      content: type === "text" ? "متن نمونه" : "",
      styles: {},
    };
    setElements((prev) => [...prev, newElement]);
    setSelected(newElement.id);
  };

  const updateStyles = (styles) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === selected ? { ...el, styles } : el
      )
    );
  };

  const saveChanges = async () => {
    const ref = doc(db, "projects", id);
    await updateDoc(ref, {
      elements,
    });
    alert("✅ تغییرات ذخیره شد!");
  };

  const selectedElement = elements.find((el) => el.id === selected);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-100 min-h-screen">
      <div className="space-y-2">
        <h2 className="font-bold text-lg">➕ افزودن عنصر</h2>
        {["text", "button", "image", "video", "form"].map((type) => (
          <button
            key={type}
            onClick={() => addElement(type)}
            className="block w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
          >
            {type}
          </button>
        ))}
        <button
          onClick={saveChanges}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          💾 ذخیره تغییرات
        </button>
      </div>

      <div className="md:col-span-2">
        <LivePreview elements={elements} />
        {selectedElement && (
          <div className="mt-6">
            <StyleEditor
              styles={selectedElement.styles}
              onChange={updateStyles}
            />
          </div>
        )}
      </div>
    </div>
  );
}