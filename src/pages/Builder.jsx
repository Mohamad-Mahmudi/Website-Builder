import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../components/SortableItem";

export default function Builder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [elements, setElements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const ref = doc(db, "projects", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setProject({ id: snapshot.id, ...data });
          setElements(data.elements || []);
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("خطا در دریافت پروژه:", err);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = elements.findIndex((el) => el.id === active.id);
    const newIndex = elements.findIndex((el) => el.id === over.id);

    const newOrder = arrayMove(elements, oldIndex, newIndex);
    setElements(newOrder);

    try {
      await updateDoc(doc(db, "projects", project.id), {
        elements: newOrder,
      });
    } catch (err) {
      console.error("خطا در ذخیره ترتیب جدید:", err);
    }
  };

  const addElement = async (type) => {
    const newElement = {
      id: crypto.randomUUID(),
      type,
      content: type === "text" ? "متن نمونه" : "دکمه نمونه",
    };

    const updatedElements = [...elements, newElement];
    setElements(updatedElements);

    try {
      await updateDoc(doc(db, "projects", id), {
        elements: updatedElements,
      });
    } catch (err) {
      console.error("خطا در ذخیره عناصر:", err);
    }
  };

  const deleteElement = async (idToDelete) => {
    const updatedElements = elements.filter((el) => el.id !== idToDelete);
    setElements(updatedElements);

    try {
      await updateDoc(doc(db, "projects", project.id), {
        elements: updatedElements,
      });
    } catch (err) {
      console.error("خطا در حذف عنصر:", err);
    }
  };

  const saveEdit = async (idToEdit) => {
    const updatedElements = elements.map((el) =>
      el.id === idToEdit ? { ...el, content: editValue } : el
    );
    setElements(updatedElements);
    setEditingId(null);
    setEditValue("");

    try {
      await updateDoc(doc(db, "projects", project.id), {
        elements: updatedElements,
      });
    } catch (err) {
      console.error("خطا در ویرایش عنصر:", err);
    }
  };

  if (loading) return <p className="p-4">در حال بارگذاری...</p>;
  if (!project) return <p className="p-4">پروژه‌ای پیدا نشد.</p>;

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-4">
        🛠️ Website Builder for {project.name}
      </h1>
      <p className="text-gray-600">دامنه: {project.domain}</p>

      <div className="mt-8 p-6 border rounded-xl bg-gray-100 text-center">
        <p>ابزار طراحی اینجاست... (Drag & Drop فعال شد!)</p>
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={() => addElement("text")}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
          >
            افزودن متن
          </button>
          <button
            onClick={() => addElement("button")}
            className="bg-green-500 text-white px-4 py-2 rounded-xl"
          >
            افزودن دکمه
          </button>
        </div>
      </div>

      <button
        onClick={async () => {
          if (!project) return;
          const ref = doc(db, "projects", project.id);
          await updateDoc(ref, { elements });
          alert("تغییرات ذخیره شد ✅");
        }}
        className="bg-purple-600 text-white px-4 py-2 rounded-xl mt-4"
      >
        💾 ذخیره سایتو
      </button>

      <div className="mt-8 space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={elements.map((el) => el.id)}
            strategy={verticalListSortingStrategy}
          >
            {elements.map((el) => (
              <SortableItem
                key={el.id}
                el={el}
                isEditing={editingId === el.id}
                editValue={editValue}
                onEditStart={(el) => {
                  setEditingId(el.id);
                  setEditValue(el.content);
                }}
                onEditChange={(val) => setEditValue(val)}
                onEditSave={() => saveEdit(el.id)}
                onDelete={() => deleteElement(el.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
