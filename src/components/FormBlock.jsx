// components/preview/FormBlock.jsx
import React from "react";

export default function FormBlock({ styles }) {
  return (
    <form style={styles} className="space-y-4 text-right">
      <input type="text" placeholder="نام شما" className="border p-2 w-full" />
      <input type="email" placeholder="ایمیل" className="border p-2 w-full" />
      <textarea placeholder="پیام" className="border p-2 w-full"></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        ارسال
      </button>
    </form>
  );
}
