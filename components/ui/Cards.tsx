import React from "react";
import { CardProps } from "../types/card";

const Cards = ({ title, icon, value, data, color, details }: CardProps) => {
  return (
    <div className="flex flex-col gap-2 bg-white p-5 rounded-md w-full dark:bg-gray-800">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between font-semibold">
          {title && <h4 className="text-sm dark:text-gray-400">{title}</h4>}
          {icon && <p className="text-sm font-semibold dark:text-gray-300">{icon}</p>}
        </div>
        {(value || value === 0) && <h2 className="text-2xl font-bold dark:text-white">{value}</h2>}

        <p className="text-sm text-gray-500 flex items-center gap-1 dark:text-gray-400">
          {data && <span className={`text-${color}-500 text-xs`}>{data}</span>}
          {details && <span className="text-xs text-gray-500 border border-blue-100 px-2 py-1 rounded-full dark:text-gray-400 dark:border-blue-900">{details}</span>}
        </p>
      </div>
    </div>
  );
};

export default Cards;
