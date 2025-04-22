import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
  } from "@dnd-kit/core";
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
  } from "@dnd-kit/sortable";
  import { CSS } from "@dnd-kit/utilities";
  import { useState } from "react";
  
  const DraggableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      border: "1px dashed #ccc",
      padding: "10px",
      marginBottom: "10px",
      background: "#fff",
      cursor: "grab"
    };
  
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  };
  
  export default function DraggableElements() {
    const [items, setItems] = useState(["text1", "button1"]);
  
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
      })
    );
  
    const handleDragEnd = (event) => {
      const { active, over } = event;
  
      if (active.id !== over.id) {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        setItems((items) => arrayMove(items, oldIndex, newIndex));
      }
    };
  
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <DraggableItem key={id} id={id}>
              {id === "text1" ? <p>📝 متن تستی</p> : <button>🔘 دکمه تستی</button>}
            </DraggableItem>
          ))}
        </SortableContext>
      </DndContext>
    );
  }
  