"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MdOutlineAnalytics } from "react-icons/md";

const LiveChart = () => {
  const options = {
    chart: {
      type: "area",
    },
    title: {
      text: " ",
    },
    xAxis: {
      categories: ["January", "February", "March", "April", "May", "June"],
    },
    yAxis: {
      title: {
        text: "Amount (£)",
      },
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
    <div className="bg-white p-4 rounded-lg w-full">
      <div className="flex items-center gap-2 mb-5">
        <MdOutlineAnalytics />
        <h2 className="text-lg font-semibold">Monthly Payroll Trends</h2>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LiveChart;
