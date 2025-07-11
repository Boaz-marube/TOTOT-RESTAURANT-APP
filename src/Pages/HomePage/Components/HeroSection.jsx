import img1 from "../../../assets/meeting-1.jpg";
import img2 from "../../../assets/get-togethers.jpg";
import img3 from "../../../assets/Raw meat.jpg";
import img4 from "../../../assets/Totot kitfo.jpg";
import ImageSlider from "./ImageSlider";

const Hero = () => {
  const Images = [img1, img2, img3, img4];
  return (
    <div
      id="home"
      className="max-[1200px]: w-full h-[calc(100vh-60px)] opacity-4"
    >
      <ImageSlider imagesUrl={Images} autoSlide={true} />
    </div>
  );
};

export default Hero;
