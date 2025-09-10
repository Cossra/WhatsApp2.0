import React from "react";
import { Button } from "@/components/ui/button";

interface CallToActionCardProps {
  headline: string;
  description: string;
  buttonText: string;
  features: string[];
}

const CallToActionCard: React.FC<CallToActionCardProps> = ({ headline, description, buttonText, features }) => (
  <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-10 w-[100vw] flex flex-col items-center px-6 sm:px-12 lg:px-24 mx-2 sm:mx-8 lg:mx-16">
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">{headline}</h3>
    <p className="text-base sm:text-lg text-gray-700 mb-6 text-center">{description}</p>
    <div className="w-full flex justify-center">
      <Button className="px-6 py-8 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200 shadow-md max-w-xs mb-2 flex items-center justify-center">{buttonText}</Button>
    </div>
    <div className="flex flex-col gap-2 mt-2 w-full items-center">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center text-xs text-gray-600">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
          {feature}
        </div>
      ))}
    </div>
  </div>
);

export default CallToActionCard;
