import React from "react";
import HeroSection from "./Components/HeroSection";
import SignatureDishes from "./Components/SignatureDishes";
import Reservation from "./Components/Reservation";
import ChatbotSection from "./Components/ChatbotSection";
export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <SignatureDishes />
      <Reservation />
      <ChatbotSection/>
    </div>
  );
}
