import React from "react";
import HeroSection from "./Components/HeroSection";
import SignatureDishes from "./Components/SignatureDishes";
import Reservation from "./Components/Reservation";
export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <SignatureDishes />
      <Reservation />
    </div>
  );
}
