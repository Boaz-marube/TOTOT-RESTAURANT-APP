const DiningCard = ({ image, title, description }) => {
  return (
    <div className="flex flex-col items-center p-4 text-center md:p-6 lg:p-8">
      <img
        src={image}
        alt={title}
        className="object-cover max-w-xs mb-2 rounded-lg lg:mb-6 w-[140px] h-[90px]"
        loading="lazy"
      />
      <h3 className="mb-2 text-2xl font-bold text-white lg:text-2xl lg:mb-3 dark:text-white">
        {title}
      </h3>
      <p className="text-base text-center text-white lg:text-lg dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default DiningCard;
