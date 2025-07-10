import React from "react";
import NavLink from "./NavLink";
import MenuDropdown from "./MenuDropdown";
import ThemeToggle from "./ThemeToggle";

const DesktopNav = () => {
  return (
    <nav
      className="items-center hidden space-x-6 md:flex"
      aria-label="Main navigation"
    >
      <NavLink href="#hero-section" label="Home" />
      <MenuDropdown />
      <NavLink href="#story" label="Our Story" />
      <NavLink href="#signature-dish" label="Signature Dishes" />
      <NavLink href="./feedback.html" label="Feedback" />
      <ThemeToggle />
    </nav>
  );
};

export default DesktopNav;
