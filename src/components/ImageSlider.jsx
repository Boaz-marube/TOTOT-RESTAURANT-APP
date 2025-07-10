import { useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import TextContent from "./TextContent";
const ImageSlider = ({
  imagesUrl,
  autoSlide = false,
  autoSlideInterval = 5000,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const showPrevImage = () => {
    setImageIndex((index) => {
      if (index == 0) return imagesUrl.length - 1;
      else return index - 1;
    });
  };
  const showNextImage = () => {
    setImageIndex((index) => {
      if (index == imagesUrl.length - 1) return 0;
      else return index + 1;
    });
  };
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(showNextImage, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);
  return (
    <div className="relative w-full h-full">
      <div className="flex w-full h-full overflow-hidden transition-transform duration-500 ease-in-out">
        {imagesUrl.map((url) => {
          return (
            <img
              src={url}
              key={url}
              className="flex-grow-0 flex-shrink-0 block object-cover w-full h-full opacity-4"
              alt
              style={{
                translate: `${-100 * imageIndex}%`,
              }}
            />
          );
        })}
      </div>
      <TextContent />
      <button
        className="absolute top-0 bottom-0 left-0 block p-6 mt-2 cursor-pointer sm:p-2"
        onClick={showPrevImage}
      >
        <ArrowBigLeft className="w-8 h-8 text-white fill-black" />
      </button>
      <button
        className="absolute top-0 bottom-0 right-0 block p-6 mt-2 cursor-pointer sm:p-2"
        onClick={showNextImage}
      >
        <ArrowBigRight className="w-8 h-8 text-white fill-black" />
      </button>

      <div className="absolute flex gap-6 bottom-2 left-1/2 -translate-x-2/4 ">
        {imagesUrl.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => setImageIndex(index)}
              className="block w-2 h-2 cursor-pointer"
              style={{ transition: "scale 100ms ease-in-out" }}
            >
              {index === imageIndex ? (
                <CircleDot className="size-3 stroke-black fill-menu-title hover:scale-150" />
              ) : (
                <Circle className="size-3 stroke-black fill-white hover:scale-150" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
