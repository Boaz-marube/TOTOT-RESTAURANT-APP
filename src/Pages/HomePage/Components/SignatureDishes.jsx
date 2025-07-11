import { useState, useRef } from "react";
import { Dishs } from "../../../database/data";
import DishFilters from "./DishFilters";
import DishCard from "./DishCard";
import LoadMoreButton from "./LoadMoreButton";

export default function SignatureDishes() {
  const [filter, setFilter] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);

  const filteredDishes = Dishs.filter(
    (dish) => filter === "all" || dish.catagory === filter
  );

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);

    // Prevent scroll jump after click
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 0);
  };

  return (
    <section className=" bg-menu dark:bg-slate-950">
      <section
        ref={sectionRef}
        className="container px-4 py-12 mx-auto transition-colors duration-300"
        id="signature-dishes"
      >
        <h1 className="p-3 mb-2 text-3xl font-bold text-center lg:text-5xl md:text-4xl text-menu-title dark:text-white font-playfair">
          Signature Dishes
        </h1>

        <DishFilters currentFilter={filter} setFilter={setFilter} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDishes
            .slice(0, isExpanded ? filteredDishes.length : 3)
            .map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
        </div>

        {filteredDishes.length > 3 && (
          <LoadMoreButton
            isExpanded={isExpanded}
            onClick={toggleExpand}
            showLessVisible={isExpanded}
          />
        )}
      </section>
    </section>
  );
}
