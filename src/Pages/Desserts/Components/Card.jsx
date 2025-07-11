import React from "react";

const Card = ({ dish }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Dish Image */}
      <div className="overflow-hidden h-48">
        <img
          src={dish.images}
          alt={dish.name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          {dish.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 min-h-[60px]">
          {dish.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-brown-500 dark:text-brown-300">
            {dish.price}
          </span>
          <button className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-opacity-90 transition-colors dark:bg-ethiopian-gold dark:text-gray-900">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
