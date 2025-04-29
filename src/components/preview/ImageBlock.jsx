import React from "react";

export default function ImageBlock({ content, styles }) {
  return (
    <div
      className="w-full p-4 bg-white dark:bg-gray-700 text-black dark:text-white rounded"
      style={{
        textAlign: styles?.textAlign || "center", // این برای تعیین موقعیت تصویره
      }}
    >
      <img
        src={content}
        alt="image"
        className="rounded"
        style={{
          maxWidth: "100%",
          height: "auto",
          ...styles,
        }}
      />
    </div>
  );
}