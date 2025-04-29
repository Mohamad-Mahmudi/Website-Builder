import React from "react";

export default function HeroSection({ content, styles }) {
  return (
    <div
      className="w-full p-4 bg-white dark:bg-gray-700 text-black dark:text-white rounded text-center"
      style={{
        ...styles,
      }}
    >
      <h1 className="w-full text-4xl font-bold mb-4">{content.title}</h1>
      <p className="w-full text-lg mb-6">{content.subtitle}</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        {content.buttonText}
      </button>
    </div>
  );
}