import React, { useState } from "react";

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center font-normal text-white transition-colors text-md hover:text-slate-900 dark:hover:text-amber-300"
        aria-expanded={isOpen}
      >
        Menu
        <span
          className={`ml-1 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <i className="mt-3 fa-solid fa-angle-down dark:text-white"></i>
        </span>
      </button>

      {/* Dropdown Items */}
      {isOpen && (
        <div
          className="absolute left-0 z-20 w-48 py-1 mt-2 font-normal text-white bg-white rounded-md shadow-lg dark:bg-gray-800 text-md"
          onMouseLeave={() => setIsOpen(false)} // auto-close when leaving dropdown
        >
          <a
            href="starter.html"
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700"
          >
            Starters
          </a>
          <a
            href="maindishes.html"
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700"
          >
            Main Dishes
          </a>
          <a
            href="drinks.html"
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700"
          >
            Drinks
          </a>
          <a
            href="desserts.html"
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700"
          >
            Desserts
          </a>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
