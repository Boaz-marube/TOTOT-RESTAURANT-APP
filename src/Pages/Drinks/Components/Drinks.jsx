import React from "react";
import Card from "./Card.jsx";
import { Dishs } from "../../../database/data.js";

const Drink = () => {
  return (
    <section className="bg-menu dark:bg-slate-900 w-full">
      {/* Hero Header */}
      <div className="w-full h-30 p-4 sm:h-40 md:h-52 lg:h-60 bg-dish-color flex items-center justify-center dark:bg-ethiopian-dark">
        <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl text-center">
          Dri<span className="border-b-4 border-yellow-400 pb-1">nks Dis</span>hes
        </h2>
      </div>

      {/* Dishes Grid */}
      <div className=" container mx-auto px-4 py-12 bg-menu-bg dark:bg-slate-900 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Dishs.map((dish) => (
            <Card key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Drink;
