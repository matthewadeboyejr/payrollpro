"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MdOutlineAnalytics } from "react-icons/md";
import { useTheme } from "next-themes";

const BarChart = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: " ",
    },
    xAxis: {
      categories: ["January", "February", "March", "April", "May", "June"],
      labels: {
        style: {
          color: isDark ? "#9ca3af" : "#666666",
        },
      },
    },
    yAxis: {
      title: {
        text: "Amount (£)",
        style: {
          color: isDark ? "#9ca3af" : "#666666",
        },
      },
      labels: {
        style: {
          color: isDark ? "#9ca3af" : "#666666",
        },
      },
      gridLineColor: isDark ? "#374151" : "#e6e6e6",
    },
    series: [
      {
        name: "Payroll",
        data: [5000, 6000, 5500, 7000, 7500, 8000],
        color: "#3B82F6",
      },
      {
        name: "Tax",
        data: [1000, 1200, 1100, 1400, 1500, 1600],
        color: "#12B981",
      },
    ],
    plotOptions: {
      column: {
        borderColor: "transparent",
      },
    },
    legend: {
      itemStyle: {
        color: isDark ? "#d1d5db" : "#333333",
      },
      itemHoverStyle: {
        color: isDark ? "#ffffff" : "#000000",
      },
    },
  };
  return (
    <div className="bg-white p-4 rounded-lg w-full dark:bg-gray-800">
      <div className="flex items-center gap-2 mb-5">
        <MdOutlineAnalytics className="dark:text-white" />
        <h2 className="text-lg font-semibold dark:text-white">Monthly Payroll & Tax Trends</h2>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
