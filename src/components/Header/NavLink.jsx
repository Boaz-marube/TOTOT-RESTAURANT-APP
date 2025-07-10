import React from "react";

const NavLink = ({ href, label }) => {
  return (
    <a
      href={href}
      className="font-normal text-white transition-colors text-md hover:text-slate-900 dark:hover:text-amber-300"
    >
      {label}
    </a>
  );
};

export default NavLink;
