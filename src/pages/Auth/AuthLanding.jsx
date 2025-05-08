import { Link } from "react-router-dom";

export default function AuthLanding() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold">به سازنده وبسایت خوش اومدی! 🚀</h1>
        <p className="text-gray-600">حساب کاربری داری یا می‌خوای ثبت‌نام کنی؟</p>

        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            ورود
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
          >
            ثبت نام
          </Link>
        </div>
      </div>
    </div>
  );
}
