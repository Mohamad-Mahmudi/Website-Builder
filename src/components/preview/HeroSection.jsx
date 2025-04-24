import React from "react";

export default function HeroSection({ content, styles }) {
  return (
    <div className="text-center py-16 px-4 bg-blue-100 rounded-xl" style={styles}>
      <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
      <p className="text-lg mb-6">{content.subtitle}</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        {content.buttonText}
      </button>
    </div>
  );
}