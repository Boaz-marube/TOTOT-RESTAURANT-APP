import React, { useState } from "react";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

export default function Header(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-10 text-black shadow-md bg-customBrown dark:bg-brown-900 dark:text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Mobile Menu Button */}
        <MobileMenuButton toggleMenu={toggleMenu} />
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
    
  );
};


