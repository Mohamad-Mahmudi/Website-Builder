import React from "react";

export default function HeaderBlock({ content, styles }) {
  return (
    <div
      className="w-full p-4 bg-white dark:bg-gray-700 text-black dark:text-white rounded"
      style={{
        ...styles,
        textAlign: styles?.textAlign || "center",
      }}
    >
      <header className="bg-gray-800 text-white text-center p-4 rounded">
        <h2 className="text-xl font-bold">{content}</h2>
      </header>
    </div>
  );
}