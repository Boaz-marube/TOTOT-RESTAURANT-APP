import React from "react";
import NavLink from "./NavLink";
import MobileDropdown from "./MobileDropdown";
import MobileThemeToggle from "./MobileThemeToggle";

const MobileMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`absolute left-0 w-full text-white bg-black shadow-lg top-full dark:bg-gray-900 transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <nav className="flex flex-col py-4" aria-label="Mobile navigation">
        <NavLink href="#hero-section" label="Home" />
        <MobileDropdown />
        <NavLink href="#story" label="Our Story" />
        <NavLink href="#signature-dish" label="Signature Dishes" />
        <NavLink href="./feedback.html" label="Feedback Form" />
        <MobileThemeToggle />
      </nav>
    </div>
  );
};

export default MobileMenu;
