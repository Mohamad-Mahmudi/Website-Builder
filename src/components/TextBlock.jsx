// components/preview/TextBlock.jsx
import React from "react";

export default function TextBlock({ content, styles }) {
  return (
    <p style={styles} className="text-right">
      {content}
    </p>
  );
}
