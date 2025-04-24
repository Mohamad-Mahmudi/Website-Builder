import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import LivePreview from "../components/LivePreview";
import StyleEditor from "../components/StyleEditor";
import ElementEditor from "../components/ElementEditor";
import Layout from "../components/Layout";

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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [elements, setElements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [editedElement, setEditedElement] = useState(null);

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
      await updateDoc(doc(db, "projects", project.id), { elements: newOrder });
    } catch (err) {
      console.error("خطا در ذخیره ترتیب جدید:", err);
    }
  };

  const addElement = async (type) => {
    const defaultStyles = {
      color: "#000000",
      backgroundColor: "#ffffff",
      fontSize: "16px",
      textAlign: "right",
      padding: "16px",
    };

    let content;
    switch (type) {
      case "text": content = "متن نمونه"; break;
      case "button": content = "دکمه نمونه"; break;
      case "image": content = "https://via.placeholder.com/400x200"; break;
      case "video": content = "https://www.youtube.com/embed/dQw4w9WgXcQ"; break;
      case "form": content = "contact-form"; break;
      case "header": content = "این یک هدر است"; break;
      case "footer": content = "این یک فوتر است"; break;
      case "hero":
        content = {
          title: "به سایت ما خوش اومدی!",
          subtitle: "اینجا می‌تونی سایتتو راحت بسازی.",
          buttonText: "همین حالا شروع کن",
        };
        break;
      default: return;
    }

    const newElement = {
      id: crypto.randomUUID(),
      type,
      content,
      styles: defaultStyles,
    };

    const updatedElements = [...elements, newElement];
    setElements(updatedElements);

    try {
      await updateDoc(doc(db, "projects", id), { elements: updatedElements });
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

  const handleSelect = (el) => {
    setSelectedElement(el);
    setEditedElement(el);
    setSelectedId(el.id);
  };

  const handleEditChange = (updatedEl) => {
    setEditedElement(updatedEl);
  };

  const handleSaveEdit = async () => {
    const updatedElements = elements.map((el) =>
      el.id === editedElement.id ? editedElement : el
    );
    setElements(updatedElements);
    setSelectedElement(null);
    setEditedElement(null);

    try {
      await updateDoc(doc(db, "projects", project.id), {
        elements: updatedElements,
      });
    } catch (err) {
      console.error("خطا در ذخیره ویرایش:", err);
    }
  };

  if (loading) return <p className="p-4">در حال بارگذاری...</p>;
  if (!project) return <p className="p-4">پروژه‌ای پیدا نشد.</p>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">
        🛠️ Website Builder for {project.name}
      </h1>
      <p className="text-gray-600 mb-6">دامنه: {project.domain}</p>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {["header", "footer", "hero", "text", "button", "image", "video", "form"].map(type => (
          <button key={type} onClick={() => addElement(type)} className="bg-blue-500 text-white px-4 py-2 rounded-xl">
            افزودن {type}
          </button>
        ))}
      </div>

      <button
        onClick={async () => {
          if (!project) return;
          const ref = doc(db, "projects", project.id);
          await updateDoc(ref, { elements });
          alert("تغییرات ذخیره شد ✅");
        }}
        className="bg-purple-600 text-white px-4 py-2 rounded-xl mb-8"
      >
        💾 ذخیره سایت
      </button>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
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
                <div key={el.id} onClick={() => handleSelect(el)}>
                  <SortableItem
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
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <div>
          <LivePreview
            elements={elements}
            onSelect={handleSelect}
            selectedId={selectedId}
          />
          {selectedId && (
            <StyleEditor
              styles={elements.find((el) => el.id === selectedId)?.styles || {}}
              onChange={(newStyles) => {
                const updated = elements.map((el) =>
                  el.id === selectedId ? { ...el, styles: newStyles } : el
                );
                setElements(updated);
              }}
            />
          )}
          {editedElement && (
            <button
              onClick={handleSaveEdit}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ذخیره تغییرات
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}