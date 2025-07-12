import React from "react";

const Card = ({ dish }) => {
  return (
    <div className="relative overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg hover:-translate-y-1">
      {/* Dish Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={dish.images}
          alt={dish.name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <h3 className="mb-1 text-xl font-bold text-dish-color dark:text-white">
          {dish.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 min-h-[60px]">
          {dish.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-red-700 dark:text-brown-300">
            {dish.price}
          </span>
          <button className="px-4 py-2 text-white transition-colors bg-green-700 rounded-md hover:bg-opacity-90 dark:bg-ethiopian-gold dark:text-white">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
