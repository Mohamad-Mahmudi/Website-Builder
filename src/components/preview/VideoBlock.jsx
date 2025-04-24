// components/preview/VideoBlock.jsx
import React from "react";

export default function VideoBlock({ content, styles }) {
  return (
    <div
      className="video-container"
      style={{
        maxWidth: "100%",
        height: "auto",
        ...styles,
      }}
    >
      <video controls className="w-full">
        <source src={content} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}