import React from "react";

export default function ButtonBlock({ content, styles }) {
  return (
    <div
      className="w-full p-4 bg-white dark:bg-gray-700 text-black dark:text-white rounded"
      style={{
        textAlign: styles?.textAlign || "center", // اینجا اضافه شد
      }}
    >
      <button
        className="p-3 rounded"
        style={{
          backgroundColor: styles?.backgroundColor || "#007BFF",
          color: styles?.color || "#fff",
          fontSize: styles?.fontSize || "16px",
          // textAlign از اینجا حذف شد چون بیرون اعمال شده
        }}
      >
        {content}
      </button>
    </div>
  );
}