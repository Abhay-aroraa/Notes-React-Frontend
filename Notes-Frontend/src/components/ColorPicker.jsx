import React from "react";
const COLORS = [
  "#202124", // dark gray (default)
  "#1E1E1E", // VS Code dark background
  "#2C3E50", // dark blue-gray
  "#3E2723", // dark brown
  "#4A148C", // deep purple
  "#00695C", // teal
  "#37474F", // blue gray
  "#1B1B2F", // navy black
  "#263238", // dark slate
  "#2D2D2D", // dark gray black
  "#0F172A", // slate-900
];


export default function ColorPicker({ currentColor, onColorSelect }) {
  return (
    <div className="flex gap-1 p-1 rounded-lg bg-[#2c2c2c]">
      {COLORS.map((color) => (
        <div
          key={color}
          className={`h-5 w-5 rounded-full border cursor-pointer transition-all duration-200 ${
            color === currentColor ? "ring-2 ring-white" : "border-white/30"
          }`}
          style={{ backgroundColor: color }}
          title={color}
          onClick={(e) => {
            e.stopPropagation();
            onColorSelect(color);
          }}
        />
      ))}
    </div>
  );
}
