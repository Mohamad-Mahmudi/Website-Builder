// components/preview/LivePreview.jsx
import React from "react";
import TextBlock from "./TextBlock";
import ButtonBlock from "./ButtonBlock";
import ImageBlock from "./ImageBlock";
import VideoBlock from "./VideoBlock";
import FormBlock from "./FormBlock";

export default function LivePreview({ elements }) {
  const renderElement = (el) => {
    switch (el.type) {
      case "text":
        return <TextBlock content={el.content} styles={el.styles} />;
      case "button":
        return <ButtonBlock content={el.content} styles={el.styles} />;
      case "image":
        return <ImageBlock content={el.content} styles={el.styles} />;
      case "video":
        return <VideoBlock content={el.content} styles={el.styles} />;
      case "form":
        return <FormBlock styles={el.styles} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-200 rounded-xl">
      <h2 className="text-xl font-bold mb-4">پیش‌نمایش سایت</h2>
      <div className="space-y-4">
        {elements.map((el) => (
          <div key={el.id} className="border p-4 rounded-lg bg-white">
            {renderElement(el)}
          </div>
        ))}
      </div>
    </div>
  );
}
