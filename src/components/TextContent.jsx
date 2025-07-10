import React, { useState, useEffect } from "react";

export default function TextContent() {
  const restaurantName = "Totot Ethiopian Traditional Restaurant";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true); // New state for cursor visibility

  useEffect(() => {
    if (currentIndex < restaurantName.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + restaurantName[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      const cursorTimer = setTimeout(() => setShowCursor(false), 100);
      return () => clearTimeout(cursorTimer);
    }
  }, [currentIndex, restaurantName]);

  return (
    <section className="absolute inset-0 flex items-center justify-center">
      <div className="w-full px-3 mx-auto max-w-7xl sm:px-6 lg:px-7">
        <div className="flex flex-col items-center text-center">
          {/* Typewriter Heading with conditional cursor */}
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-5xl font-playfair">
            {displayedText}
            {showCursor && <span className="animate-pulse">|</span>}
          </h1>

          {/* Rest of your content remains unchanged */}
          <p className="mb-6 text-xl text-white sm:text-2xl">
            Where every bite tells a story
          </p>
          <a
            className="px-8 py-3 text-lg font-bold text-white transition-transform rounded-md bg-gradient-to-r from-ethiopian-red to-ethiopian-dark hover:scale-105"
            href="./maindishes.html"
          >
            Explore Our Menu
          </a>
        </div>
      </div>
    </section>
  );
}
