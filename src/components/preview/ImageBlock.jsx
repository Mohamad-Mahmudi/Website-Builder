// components/preview/ImageBlock.jsx
import React from "react";

export default function ImageBlock({ content, styles }) {
  return (
    <img
      src={content}
      alt="image"
      className="w-full rounded"
      style={{
        maxWidth: "100%",
        height: "auto",
        ...styles,
      }}
    />
  );
}