import React from "react";

function ElementEditor({ selected, onChange, onSave, onClose }) {
  if (!selected) return null;

  const handleChange = (key, value) => {
    onChange({
      ...selected,
      [key]: value,
    });
  };

  const handleStyleChange = (key, value) => {
    onChange({
      ...selected,
      styles: {
        ...selected.styles,
        [key]: value,
      },
    });
  };

  return (
    <div className="w-full md:w-80 bg-white p-4 shadow-lg rounded-xl border">
      <h3 className="text-lg font-bold mb-4">🛠️ ویرایشگر</h3>

      {selected.type !== "form" && (
        <div className="mb-4">
          <label className="block mb-1">محتوا:</label>
          <input
            value={selected.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1">رنگ متن:</label>
        <input
          type="color"
          value={selected.styles?.color || "#000000"}
          onChange={(e) => handleStyleChange("color", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">رنگ پس‌زمینه:</label>
        <input
          type="color"
          value={selected.styles?.backgroundColor || "#ffffff"}
          onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">اندازه فونت:</label>
        <input
          type="number"
          value={parseInt(selected.styles?.fontSize) || 16}
          onChange={(e) => handleStyleChange("fontSize", `${e.target.value}px`)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">تراز متن:</label>
        <select
          value={selected.styles?.textAlign || "right"}
          onChange={(e) => handleStyleChange("textAlign", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="right">راست</option>
          <option value="center">وسط</option>
          <option value="left">چپ</option>
        </select>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onSave}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          ذخیره
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded-xl"
        >
          بستن
        </button>
      </div>
    </div>
  );
}

export default ElementEditor;
