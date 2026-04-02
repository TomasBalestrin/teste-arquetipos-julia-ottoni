"use client";

import QuizLogo from "./QuizLogo";
import OfferSection from "./OfferSection";

export default function QuizResult() {
  return (
    <div className="flex flex-col items-center pb-16 pt-4">
      <QuizLogo />
      <OfferSection />
    </div>
  );
}
