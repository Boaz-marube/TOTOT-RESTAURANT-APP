import { useState } from "react";

export default function DishCard({ dish }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative transition-all duration-300 bg-white rounded-lg shadow-md dark:bg-gray-800 group hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Dish Image */}
      <div className="overflow-hidden">
        <img
          src={dish.images}
          alt={dish.name}
          className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Dish Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white font-playfair">
          {dish.name}
        </h3>
      </div>
      <div
        role="tooltip"
        className={`absolute z-50 transition-all duration-300 ease-in-out pointer-events-none w-64 px-4 py-3 rounded-lg shadow-xl text-sm
    ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
    ${showTooltip ? "visible" : "invisible"}
    bg-gray-900 text-white dark:bg-gray-700
  `}
        style={{
          bottom: "4rem",
          left: "1rem",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          borderBottomLeftRadius: "1rem",
        }}
      >
        <p className="mb-1">{dish.description}</p>
        <p className="font-bold">{dish.price}</p>
      </div>
    </div>
  );
}
