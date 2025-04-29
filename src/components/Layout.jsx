import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Layout({ children }) {
  const {theme , toggleTheme} =useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-800 shadow-lg w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition duration-200 ease-in-out md:relative md:translate-x-0`}>
        <Link to="/" className="text-blue-600 flex items-center space-x-2 px-4">
          <span className="text-2xl font-bold">سایت‌ساز ✨</span>
        </Link>

        <nav className="mt-10">
          <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
            داشبورد
          </Link>
          <Link to="/create-project" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
            ساخت پروژه جدید
          </Link>
          <Link to="/about" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 hover:text-white">
            درباره ما
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="flex items-center">
            <button 
              className="text-gray-500 focus:outline-none md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <h1 className="text-2xl font-bold ml-4">پنل مدیریت</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-4">
          © {new Date().getFullYear()} سایت‌ساز - همه حقوق محفوظ است.
        </footer>
      </div>
    </div>
  );
}