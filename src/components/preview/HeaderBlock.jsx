import React from "react";

export default function HeaderBlock({ content, styles }) {
  return (
    <header className="bg-gray-800 text-white text-center p-4 rounded" style={styles}>
      <h2 className="text-xl font-bold">{content}</h2>
    </header>
  );
}
