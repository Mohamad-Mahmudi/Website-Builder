import React from "react";
import TextBlock from "./preview/TextBlock";
import ButtonBlock from "./preview/ButtonBlock";
import ImageBlock from "./preview/ImageBlock";
import VideoBlock from "./preview/VideoBlock";
import FormBlock from "./preview/FormBlock";
import HeroSection from "./preview/HeroSection";
import HeaderBlock from "./preview/HeaderBlock";
import FooterBlock from "./preview/FooterBlock";
import { motion } from "framer-motion";

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
    <div className="p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl w-full">

    <div className="p-6 bg-gray-200 rounded-xl w-full">
      <h2 className="text-xl font-bold mb-4 text-center">پیش‌نمایش سایت</h2>
      <div className="space-y-4 w-full">

        {elements.map((el) => (
          <motion.div
            key={el.id}
            onClick={() => onSelect(el)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full border p-4 rounded-lg bg-white cursor-pointer transition-all ${
              el.id === selectedId
                ? "ring-2 ring-blue-500"
                : "hover:ring-1 hover:ring-gray-400"
            }`}
          >
            {renderElement(el)}
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
}