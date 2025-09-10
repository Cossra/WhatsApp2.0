import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
  <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200 shadow-lg hover:shadow-2xl hover:bg-white/80 transition-all duration-200 p-8 flex flex-col justify-center items-center min-h-[180px] sm:min-h-[200px] md:min-h-[220px] w-full cursor-pointer">
      {icon}
      <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
      <p className="text-gray-500 text-center text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
