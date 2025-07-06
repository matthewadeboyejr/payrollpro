import React from "react";
import { CardProps } from "../types/card";

const Cards = ({ title, icon, value, data, color, details }: CardProps) => {
  return (
    <div className="flex flex-col gap-2 bg-white p-5 rounded-md w-full">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between font-semibold">
          <h4 className="text-sm  ">{title}</h4>
          <p className="text-sm font-semibold">{icon}</p>
        </div>
        <h2 className="text-2xl font-bold">{value}</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <span className={`text-${color}-500`}>{data}</span>
          <span>{details}</span>
        </p>
      </div>
    </div>
  );
};

export default Cards;
