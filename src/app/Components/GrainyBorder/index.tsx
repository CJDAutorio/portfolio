import React from "react";
import "./style.css";

const GrainyBorders: React.FC = () => {
  return (
    <div className="grainy-border-outer w-full h-12 my-6 bg-orange-500 relative">
      <div className="grainy-border-inner w-full h-5 bg-white absolute top-1/2"></div>
    </div>
  );
};

export default GrainyBorders;
