import { useState } from "react";

export default function BuilderStandalone() {
  const [elements, setElements] = useState([]);

  const addElement = (type) => {
    const newElement = {
      id: crypto.randomUUID(),
      type,
      content: type === "text" ? "متن نمونه" : "دکمه نمونه",
    };
    setElements((prev) => [...prev, newElement]);
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-4">🛠️ Website Builder (Standalone)</h1>

      <div className="mt-8 p-6 border rounded-xl bg-gray-100 text-center">
        <p>ابزار طراحی اینجاست... (نسخه‌ی مستقل)</p>

        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={() => addElement("text")}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
          >
            افزودن متن
          </button>
          <button
            onClick={() => addElement("button")}
            className="bg-green-500 text-white px-4 py-2 rounded-xl"
          >
            افزودن دکمه
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {elements.map((el) => (
          <div key={el.id} className="border p-4 rounded-xl bg-white shadow">
            {el.type === "text" && <p className="text-lg">{el.content}</p>}
            {el.type === "button" && (
              <button className="bg-gray-800 text-white px-4 py-2 rounded-xl">
                {el.content}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
