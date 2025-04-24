import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* هدر */}
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            سایت‌ساز ✨
          </Link>
          <nav className="space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
              داشبورد
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              درباره ما
            </Link>
          </nav>
        </div>
      </header>

      {/* محتوای اصلی */}
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>

      {/* فوتر */}
      <footer className="bg-gray-100 text-center text-sm p-4 mt-8 text-gray-500">
        © {new Date().getFullYear()} سایت‌ساز - همه حقوق محفوظ است.
      </footer>
    </div>
  );
}