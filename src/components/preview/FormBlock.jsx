// components/preview/FormBlock.jsx
import React from "react";

export default function FormBlock({ styles }) {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full p-2 rounded border"
        style={styles}
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full p-2 rounded border"
        style={styles}
      />
      <textarea
        placeholder="Your Message"
        className="w-full p-2 rounded border"
        style={styles}
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        ارسال
      </button>
    </form>
  );
}