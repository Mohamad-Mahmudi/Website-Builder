import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({
  el,
  isEditing,
  editValue,
  onEditStart,
  onEditChange,
  onEditSave,
  onDelete,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: el.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border p-4 rounded-xl bg-white shadow flex justify-between items-center"
    >
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            onBlur={onEditSave}
            onKeyDown={(e) => e.key === "Enter" && onEditSave()}
            autoFocus
          />
        ) : (
          <div
            onClick={() => onEditStart(el)}
            className="cursor-pointer select-none"
          >
            {el.type === "text" && <p className="text-lg">{el.content}</p>}
            {el.type === "button" && (
              <button className="bg-gray-800 text-white px-4 py-2 rounded-xl">
                {el.content}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={onDelete}
          className="text-red-500 hover:underline"
        >
          🗑️ حذف
        </button>
      </div>
    </div>
  );
}
