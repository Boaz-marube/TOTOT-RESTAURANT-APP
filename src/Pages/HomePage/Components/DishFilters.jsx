export default function DishFilters({ currentFilter, setFilter }) {
  const filters = [
    { value: "all", label: "All Dishes" },
    { value: "veg", label: "Vegetarian" },
    { value: "non-veg", label: "Non-Vegetarian" },
    { value: "chef-special", label: "Chef's Specials" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          aria-label={`Show ${label}`}
          className={`px-4 py-2 rounded-full transition-colors
                     ${
                       currentFilter === value
                         ? "bg-gradient-to-r from-ethiopian-red to-ethiopian-dark text-white dark:bg-ethiopian-gold dark:text-white"
                         : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                     }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
