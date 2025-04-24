import React from "react";
import TextBlock from "./preview/TextBlock";
import ButtonBlock from "./preview/ButtonBlock";
import ImageBlock from "./preview/ImageBlock";
import VideoBlock from "./preview/VideoBlock";
import FormBlock from "./preview/FormBlock";
import HeroSection from "./preview/HeroSection"; // اضافه شد
import HeaderBlock from "./preview/HeaderBlock"; // اضافه شد
import FooterBlock from "./preview/FooterBlock"; // اضافه شد

export default function LivePreview({ elements, onSelect, selectedId }) {
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
      case "hero":
        return <HeroSection content={el.content} styles={el.styles} />;
      case "header":
        return <HeaderBlock content={el.content} styles={el.styles} />;
      case "footer":
        return <FooterBlock content={el.content} styles={el.styles} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-200 rounded-xl">
      <h2 className="text-xl font-bold mb-4">پیش‌نمایش سایت</h2>
      <div className="space-y-4">
        {elements.map((el) => (
          <div
            key={el.id}
            onClick={() => onSelect(el)}
            className={`border p-4 rounded-lg bg-white cursor-pointer transition-all ${
              el.id === selectedId
                ? "ring-2 ring-blue-500"
                : "hover:ring-1 hover:ring-gray-400"
            }`}
          >
            {renderElement(el)}
          </div>
        ))}
      </div>
    </div>
  );
}