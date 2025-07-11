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
    <section id="signature-dish" className=" bg-menu dark:bg-slate-950">
      <section
        ref={sectionRef}
        className="container px-4 py-12 mx-auto transition-colors duration-300"
        id="signature-dishes"
      >
        <h2 className="mb-2 text-3xl font-bold text-menu-title dark:text-white text-center p-3">
          Signature Dishes
        </h2>

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
