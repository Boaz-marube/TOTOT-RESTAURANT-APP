import React from "react";

const MobileMenuButton = ({ toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className="flex flex-col items-center justify-center w-10 h-10 focus:outline-none md:hidden"
    >
      <span className="hamburger-line block w-8 h-1 bg-white rounded-sm"></span>
      <span className="hamburger-line mt-1.5 block w-8 h-1 bg-white rounded-sm"></span>
      <span className="hamburger-line mt-1.5 block w-8 h-1 bg-white rounded-sm"></span>
    </button>
  );
};

export default MobileMenuButton;
