export default function TextBlock({ content, styles }) {
  return (
    <div
      className="w-full p-4 bg-white dark:bg-gray-700 text-black dark:text-white rounded"
      style={{
        textAlign: styles?.textAlign || "left", // اینو آوردیم بیرون
      }}
    >
      <p
        className="text-sm"
        style={{
          color: styles?.color || "#000",
          backgroundColor: styles?.backgroundColor || "#fff",
          fontSize: styles?.fontSize || "16px",
          // textAlign حذف شد چون الان توی div تنظیم شده
        }}
      >
        {content}
      </p>
    </div>
  );
}