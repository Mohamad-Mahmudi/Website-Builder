// components/preview/ImageBlock.jsx
import React from "react";

export default function ImageBlock({ content, styles }) {
  return <img src={content} alt="تصویر" style={styles} className="rounded" />;
}
