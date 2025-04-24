// components/preview/TextBlock.jsx
import React from "react";

export default function TextBlock({ content, styles }) {
  return (
    <p
      className="text-sm"
      style={{
        color: styles?.color || "#000",
        backgroundColor: styles?.backgroundColor || "#fff",
        fontSize: styles?.fontSize || "16px",
        textAlign: styles?.textAlign || "left",
      }}
    >
      {content}
    </p>
  );
}