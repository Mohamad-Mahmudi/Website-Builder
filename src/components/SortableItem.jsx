import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical, Trash2, Pencil, Save } from "lucide-react";

export default function SortableItem({
  el,
  isEditing,
  editValue,
  onEditStart,
  onEditChange,
  onEditSave,
  onDelete,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: el.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="bg-white p-4 border rounded-xl flex justify-between items-center shadow-sm"
    >
      <div className="flex items-center gap-4">
        <GripVertical {...attributes} {...listeners} className="cursor-grab text-gray-500" />

        {isEditing ? (
          <input
            className="border px-2 py-1 rounded"
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            autoFocus
          />
        ) : el.type === "text" ? (
          <p className="text-lg">{el.content}</p>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-1 rounded">{el.content}</button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <button onClick={onEditSave}>
            <Save className="w-5 h-5 text-green-600" />
          </button>
        ) : (
          <button onClick={() => onEditStart(el)}>
            <Pencil className="w-5 h-5 text-blue-500" />
          </button>
        )}
        <button onClick={() => onDelete(el.id)}>
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </motion.div>
  );
}
