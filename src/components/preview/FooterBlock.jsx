import React from "react";

export default function FooterBlock({ content, styles }) {
  return (
    <div
      className="w-full p-4 bg-white dark:bg-gray-700 text-black dark:text-white rounded"
      style={{
        ...styles,
        textAlign: styles?.textAlign || "center",
      }}
    >
      <footer className="bg-gray-900 text-white text-center p-4 rounded">
        <p className="text-sm">{content}</p>
      </footer>
    </div>
  );
}