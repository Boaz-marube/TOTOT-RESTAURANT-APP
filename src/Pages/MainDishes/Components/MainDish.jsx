// components/sections/MainDishes.jsx
import Card from "./Card";
import DiningCard from "./DiningCard";
import { features } from "../../../database/data";
import { mainDish } from "../../../database/data";
const MainDishes = () => {
  return (
    <section className="w-full bg-menu dark:bg-slate-900">
      {/* Hero Header */}
      <div className="flex items-center justify-center w-full p-4 h-30 sm:h-40 md:h-52 lg:h-60 bg-dish-color dark:bg-ethiopian-dark">
        <h2 className="text-3xl text-center text-white sm:text-4xl lg:text-5xl">
          Ma<span className="pb-1 border-b-4 border-yellow-400">in Dis</span>hes
        </h2>
      </div>

      {/* Dishes Grid */}
      <div className="container w-full px-4 py-12 mx-auto bg-menu-bg dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mainDish.map((dish) => (
            <Card key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
      <div className="w-full py-12 lg:h-auto bg-dish-color dark:bg-ethiopian-dark">
        <h1 className="mb-12 text-3xl text-center text-white md:text-4xl lg:text-5xl dark:text-white font-playfair ">
          The Ethiopian{" "}
          <span className="pb-1 border-b-4 border-yellow-400">Dining Ex</span>
          perience
        </h1>

        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <DiningCard
                key={index}
                image={feature.image}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainDishes;
