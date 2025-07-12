import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollLink = ({ to, children, className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // If not already on homepage, navigate first
      navigate(`/${to}`);
    } else {
      const section = document.querySelector(to);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default ScrollLink;
