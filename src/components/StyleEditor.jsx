// src/components/StyleEditor.jsx
import React from "react";

export default function StyleEditor({ element, onChange }) {
  if (!element) return null;

  const handleChange = (field, value) => {
    const newStyles = { ...element.styles, [field]: value };
    onChange({ ...element, styles: newStyles });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      <h3 className="text-lg font-bold mb-2">🎨 ویرایش استایل</h3>

      <div className="space-y-2">
        <label className="block text-sm">رنگ متن:</label>
        <input
          type="color"
          value={element.styles.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />

        <label className="block text-sm">رنگ پس‌زمینه:</label>
        <input
          type="color"
          value={element.styles.backgroundColor}
          onChange={(e) => handleChange("backgroundColor", e.target.value)}
        />

        <label className="block text-sm">اندازه فونت (px):</label>
        <input
          type="number"
          value={parseInt(element.styles.fontSize)}
          onChange={(e) => handleChange("fontSize", `${e.target.value}px`)}
          className="w-full border rounded p-1"
        />

        <label className="block text-sm">ترازبندی متن:</label>
        <select
          value={element.styles.textAlign}
          onChange={(e) => handleChange("textAlign", e.target.value)}
          className="w-full border rounded p-1"
        >
          <option value="right">راست‌چین</option>
          <option value="center">وسط‌چین</option>
          <option value="left">چپ‌چین</option>
        </select>

        <label className="block text-sm">Padding:</label>
        <input
          type="text"
          value={element.styles.padding}
          onChange={(e) => handleChange("padding", e.target.value)}
          className="w-full border rounded p-1"
        />
      </div>
    </div>
  );
}