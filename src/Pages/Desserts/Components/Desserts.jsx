import React from "react";
import Card from "./Card.jsx";
import { desserts } from "../../../database/data.js";

const Desserts = () => {
  return (
    <section className="w-full bg-menu dark:bg-slate-900">
      {/* Hero Header */}
      <div className="flex items-center justify-center w-full p-4 h-30 sm:h-40 md:h-52 lg:h-60 bg-dish-color dark:bg-ethiopian-dark">
        <h2 className="text-3xl text-center text-white sm:text-4xl lg:text-5xl">
          De<span className="pb-1 border-b-4 border-yellow-400">sse</span>rts
        </h2>
      </div>

      {/* Dishes Grid */}
      <div className="container w-full px-4 py-12 mx-auto  bg-menu-bg dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {desserts.map((dish) => (
            <Card key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Desserts;
