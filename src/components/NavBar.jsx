import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "@/assets/toto-logo.png";
import ScrollLink from "@/components/ScrollLink";


const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleMenuDropdown = () => setMenuDropdownOpen(!menuDropdownOpen);

  const menuLinks = [
    { label: "Starters", to: "/starter" },
    { label: "Main Dishes", to: "/maindishes" },
    { label: "Drinks", to: "/drinks" },
    { label: "Desserts", to: "/desserts" },
  ];

  return (
    <header className="sticky top-0 z-10 text-white shadow-md bg-customBrown dark:bg-brown-900">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Toto Logo" className="w-9 h-9" />
        </div>

        {/* Desktop Navigation */}
        <nav className="items-center hidden space-x-6 md:flex" aria-label="Main navigation">
          <Link to="/#home" className="nav-link">Home</Link>

          <div
            className="relative"
            onMouseEnter={() => setMenuDropdownOpen(true)}
            onMouseLeave={() => setMenuDropdownOpen(false)}
          >
            <button className="flex items-center nav-link">
              Menu <i className="ml-1 fa-solid fa-angle-down"></i>
            </button>

            {menuDropdownOpen && (
              <div className="absolute left-0 z-20 w-48 py-1 mt-0 bg-white rounded-md shadow-lg dark:bg-gray-800">
                {menuLinks.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* <a href="/#reservation" className="nav-link">Reservation</a>
          <a href="/#signature-dish" className="nav-link">Signature Dishes</a>
          <a href="/#chatbot" className="nav-link"></a>
          <a href="/#feedback" className="nav-link"></a> */}


        <ScrollLink to="#reservation" className="nav-link">Reservation</ScrollLink>
        <ScrollLink to="#signature-dish" className="nav-link">Signature Dishes</ScrollLink>


          <ThemeToggle />
        </nav>

        {/* Hamburger Menu */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col items-center justify-center w-10 h-10 focus:outline-none relative"
          >
            <span className={`hamburger-line bg-gray-100 h-1 w-9 rounded transform transition duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-3' : ''}`} />
            <span className={`hamburger-line mt-1.5 bg-gray-100 h-1 w-9 rounded transition duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`hamburger-line mt-1.5 bg-gray-100 h-1 w-9 rounded transform transition duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute md:hidden left-0 pl-2 w-full text-white bg-black shadow-lg top-full dark:bg-gray-900 font-bold">
          <nav className="flex flex-col py-4" aria-label="Mobile navigation">
            <Link to="/#home" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <hr className="border-t border-gray-300 my-2" />

            {/* Dropdown */}
            <div>
              <button
                onClick={toggleMenuDropdown}
                className="flex items-center justify-between w-full px-0 py-0 text-left transition-colors hover:bg-gray-800 pr-4"
              >
                Menu <span>{menuDropdownOpen ? "-" : "+"}</span>
              </button>
              {menuDropdownOpen && (
                <div className="bg-gray-900 dark:bg-black">
                  {menuLinks.map(({ label, to }) => (
                    <Link
                      key={to}
                      to={to}
                      className="block px-10 py-2 transition-colors hover:bg-gray-800"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMenuDropdownOpen(false);
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-t border-gray-300 my-2" />
            <a href="/#reservation" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Reservation
            </a>
            <hr className="border-t border-gray-300 my-2" />
            <a href="/#signature-dish" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Signature Dishes
            </a>
            <hr className="border-t border-gray-300 my-2" />
            {/* Mobile Theme Toggle */}
            <div className="px-0 py-0">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
