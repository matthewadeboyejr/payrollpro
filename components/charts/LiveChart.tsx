"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MdOutlineAnalytics } from "react-icons/md";

const LiveChart = () => {
  const options = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
    },
    title: {
      text: " ",
    },
    xAxis: {
      categories: ["January", "February", "March", "April", "May", "June"],
      labels: {
        style: {
          color: "#9ca3af", // gray-400
        },
      },
    },
    yAxis: {
      title: {
        text: "Amount (£)",
        style: {
          color: "#9ca3af",
        },
      },
      labels: {
        style: {
          color: "#9ca3af",
        },
      },
      gridLineColor: "#374151", // gray-700
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    tooltip: {
      backgroundColor: "#1f2937", // gray-800
      style: {
        color: "#ffffff",
      },
      borderColor: "#374151",
    },
    series: [
      {
        name: "Payroll",
        data: [5000, 6000, 5500, 7000, 7500, 8000],
        color: "#3B82F6",
        fillOpacity: 0.3,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    ],
  };
  return (
    <div className="bg-white p-4 rounded-lg w-full dark:bg-gray-800">
      <div className="flex items-center gap-2 mb-5">
        <MdOutlineAnalytics className="dark:text-white" />
        <h2 className="text-lg font-semibold dark:text-white">Monthly Payroll Trends</h2>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LiveChart;
