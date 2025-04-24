// src/components/ContentEditor.jsx
export default function ContentEditor({ selectedElement, onChange }) {
    if (!selectedElement) return null;
  
    return (
      <div className="p-4 border rounded bg-white space-y-4 shadow-md">
        <h3 className="text-lg font-semibold mb-2">📝 ویرایش محتوا</h3>
  
        {["text", "button"].includes(selectedElement.type) && (
          <div>
            <label className="block text-sm mb-1">محتوا:</label>
            <input
              type="text"
              value={selectedElement.content || ""}
              onChange={(e) =>
                onChange({ ...selectedElement, content: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>
        )}
  
        {["image", "video"].includes(selectedElement.type) && (
          <div>
            <label className="block text-sm mb-1">
              آدرس {selectedElement.type === "image" ? "تصویر" : "ویدیو"}:
            </label>
            <input
              type="text"
              value={selectedElement.content || ""}
              onChange={(e) =>
                onChange({ ...selectedElement, content: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>
        )}
  
        {selectedElement.type === "form" && (
          <p className="text-sm text-gray-500">فرم فعلاً محتوای قابل ویرایش ندارد.</p>
        )}
      </div>
    );
  }