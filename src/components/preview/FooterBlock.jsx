import React from "react";

export default function FooterBlock({ content, styles }) {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 rounded" style={styles}>
      <p className="text-sm">{content}</p>
    </footer>
  );
}