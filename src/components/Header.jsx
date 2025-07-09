import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 text-black shadow-md bg-customBrown dark:bg-brown-900 dark:text-white">
      <Navbar />
      <h2>This is the header section</h2>
    </header>
  );
}
