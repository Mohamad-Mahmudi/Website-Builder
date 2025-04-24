export default function HeroSection({ content = {}, styles = {} }) {
    return (
      <section style={styles} className="text-center p-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{content.title || "عنوان پیش‌فرض"}</h1>
        <p className="text-xl mb-6">{content.subtitle || "توضیح کوتاه برای Hero Section"}</p>
        <button className="bg-white text-indigo-600 px-6 py-3 font-semibold rounded-full shadow hover:bg-gray-100 transition">
          {content.buttonText || "شروع کن"}
        </button>
      </section>
    );
  }