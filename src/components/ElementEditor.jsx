import React from "react";

export default function ElementEditor({ selected, onChange, onSave, onClose }) {
  if (!selected) return null;

  const { type, content, styles } = selected;

  const handleContentChange = (key, value) => {
    const updatedContent =
      typeof content === "object"
        ? { ...content, [key]: value }
        : value;
    onChange({ ...selected, content: updatedContent });
  };

  const handleStyleChange = (key, value) => {
    onChange({
      ...selected,
      styles: {
        ...styles,
        [key]: value,
      },
    });
  };

  const renderContentEditor = () => {
    switch (type) {
      case "text":
      case "button":
      case "header":
      case "footer":
      case "form":
        return (
          <textarea
            value={content}
            onChange={(e) => handleContentChange("content", e.target.value)}
            rows={3}
            className="w-full p-2 border rounded"
          />
        );

      case "image":
      case "video":
        return (
          <input
            type="text"
            value={content}
            onChange={(e) => handleContentChange("content", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="URL"
          />
        );

      case "hero":
        return (
          <div className="space-y-2">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="عنوان"
              value={content.title}
              onChange={(e) => handleContentChange("title", e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="زیرعنوان"
              value={content.subtitle}
              onChange={(e) => handleContentChange("subtitle", e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="متن دکمه"
              value={content.buttonText}
              onChange={(e) => handleContentChange("buttonText", e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full md:w-96 bg-white p-5 shadow-lg rounded-xl border space-y-4">
      <h3 className="text-lg font-bold">🛠️ ویرایشگر {type}</h3>

      <div>
        <label className="block mb-1">محتوا:</label>
        {renderContentEditor()}
      </div>

      <div>
        <label className="block mb-1">رنگ متن:</label>
        <input
          type="color"
          value={styles?.color || "#000000"}
          onChange={(e) => handleStyleChange("color", e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">رنگ پس‌زمینه:</label>
        <input
          type="color"
          value={styles?.backgroundColor || "#ffffff"}
          onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">اندازه فونت:</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={parseInt(styles?.fontSize) || 16}
          onChange={(e) => handleStyleChange("fontSize", `${e.target.value}px`)}
        />
      </div>

      <div>
        <label className="block mb-1">تراز متن:</label>
        <select
          className="w-full p-2 border rounded"
          value={styles?.textAlign || "right"}
          onChange={(e) => handleStyleChange("textAlign", e.target.value)}
        >
          <option value="right">راست</option>
          <option value="center">وسط</option>
          <option value="left">چپ</option>
        </select>
      </div>

      <div className="flex justify-between pt-4">
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