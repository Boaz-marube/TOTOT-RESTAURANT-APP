import React, { useState, useEffect } from "react";

export default function TextContent() {
  const restaurantName = "Totot Ethiopian Traditional Restaurant";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timer;

    if (currentIndex < restaurantName.length) {
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev + restaurantName[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
    } else {
      timer = setTimeout(() => {
        setShowCursor(false);
        setTimeout(() => {
          setDisplayedText("");
          setCurrentIndex(0);
          setShowCursor(true);
        }, 5000);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="absolute inset-0 flex items-center justify-center ">
      <div className="w-full px-3 mx-auto max-w-7xl sm:px-6 lg:px-7">
        <div className="flex flex-col items-center text-center bg-black/30 backdrop-blur-sm m-8 p-6 rounded-lg">
          {/* Typewriter Heading with conditional cursor */}
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl font-playfair text-pretty">
            {displayedText}
            {showCursor && <span className="animate-pulse">|</span>}
          </h1>

          <p className="mb-6 text-xl text-white sm:text-2xl">
            Where every bite tells a story
          </p>
          <a
            className="px-8 py-3 text-lg font-bold text-white transition-transform rounded-md bg-gradient-to-r from-ethiopian-red to-ethiopian-dark hover:scale-105"
            href="/maindishes"
          >
            Explore Our Menu
          </a>
        </div>
      </div>
    </section>
  );
}
