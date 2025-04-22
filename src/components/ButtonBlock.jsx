// components/preview/ButtonBlock.jsx
import React from "react";

export default function ButtonBlock({ content, styles }) {
  return (
    <button style={styles} className="px-4 py-2 rounded">
      {content}
    </button>
  );
}
