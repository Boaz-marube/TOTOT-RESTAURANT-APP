import React,{useState,useEffect} from "react";


export default function Hero() {
  return (
    <section
    id="hero-section"
    className="relative pt-[--header-height] h-[calc(100vh-var(--header-height))] bg-cover bg-center transition-all duration-1000"
  >
        <div className="container flex flex-col items-center justify-center h-full px-4 mx-auto text-center text-white">
      {/* Typewriter Animation Container */}
      <h1
        id="restaurant-name"
        className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl font-playfair text-pretty"
      >
        {/* You'll need to add the restaurant name here or handle it with state/props */}
      </h1>
      <p className="max-w-2xl mb-8 text-lg md:text-xl">
        Where Every Bite Tells a Story
      </p>
      {/* CTA Button */}
      <a
        className="px-8 py-3 text-lg font-bold text-white transition-transform rounded-md bg-gradient-to-r from-ethiopian-red to-ethiopian-dark hover:scale-105"
        href="./maindishes.html"
      >
        Explore Our Menu
      </a>
    </div>
  </section>
  );
}
