// components/preview/ButtonBlock.jsx
import React from "react";

export default function ButtonBlock({ content, styles }) {
  return (
    <button
      className="p-3 rounded"
      style={{
        backgroundColor: styles?.backgroundColor || "#007BFF",
        color: styles?.color || "#fff",
        fontSize: styles?.fontSize || "16px",
        textAlign: styles?.textAlign || "center",
      }}
    >
      {content}
    </button>
  );
}