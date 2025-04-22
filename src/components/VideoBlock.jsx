// components/preview/VideoBlock.jsx
import React from "react";

export default function VideoBlock({ content, styles }) {
  return (
    <div className="aspect-video w-full">
      <iframe
        src={content}
        style={styles}
        title="ویدیو"
        className="w-full h-full rounded"
        allowFullScreen
      ></iframe>
    </div>
  );
}
