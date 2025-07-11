export default function LoadMoreButton({
  isExpanded,
  onClick,
  showLessVisible,
}) {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        aria-label={isExpanded ? "Show fewer dishes" : "Load more dishes"}
        className="px-8 py-3 text-lg font-bold text-white transition-transform rounded-md bg-gradient-to-r from-ethiopian-red to-ethiopian-dark hover:scale-100"
      >
        {isExpanded ? "Show Less" : "Load More"}
      </button>
    </div>
  );
}
