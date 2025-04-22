// src/components/StyleEditor.jsx
import React from "react";

export default function StyleEditor({ styles, onChange }) {
  return (
    <div className="p-4 border rounded bg-white space-y-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2">🎨 تنظیمات استایل</h3>

      <div>
        <label className="block text-sm mb-1">🎨 رنگ متن:</label>
        <input
          type="color"
          value={styles.color || "#000000"}
          onChange={(e) => onChange({ ...styles, color: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">🖌 رنگ پس‌زمینه:</label>
        <input
          type="color"
          value={styles.backgroundColor || "#ffffff"}
          onChange={(e) => onChange({ ...styles, backgroundColor: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">🔠 اندازه فونت:</label>
        <input
          type="number"
          value={parseInt(styles.fontSize) || 16}
          min={10}
          max={60}
          onChange={(e) => onChange({ ...styles, fontSize: e.target.value + "px" })}
          className="border p-1 rounded w-full"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">📐 ترازبندی متن:</label>
        <select
          value={styles.textAlign || "right"}
          onChange={(e) => onChange({ ...styles, textAlign: e.target.value })}
          className="border p-1 rounded w-full"
        >
          <option value="right">راست</option>
          <option value="center">مرکز</option>
          <option value="left">چپ</option>
        </select>
      </div>
    </div>
  );
}
