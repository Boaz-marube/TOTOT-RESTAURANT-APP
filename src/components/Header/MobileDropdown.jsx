import React, { useState } from "react";

const MobileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="mobile-dropdown">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-6 py-3 text-left transition-colors mobile-dropdown-button hover:bg-gray-800"
      >
        Menu <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>

      {isOpen && (
        <div className="bg-gray-900 dark:bg-black">
          <a
            href="starter.html"
            className="block px-10 py-2 transition-colors hover:bg-gray-800"
          >
            Starters
          </a>
          <a
            href="maindishes.html"
            className="block px-10 py-2 transition-colors hover:bg-gray-800"
          >
            Main Dishes
          </a>
          <a
            href="drinks.html"
            className="block px-10 py-2 transition-colors hover:bg-gray-800"
          >
            Drinks
          </a>
          <a
            href="desserts.html"
            className="block px-10 py-2 transition-colors hover:bg-gray-800"
          >
            Desserts
          </a>
        </div>
      )}
    </div>
  );
};

export default MobileDropdown;
