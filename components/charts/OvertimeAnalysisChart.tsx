"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const OvertimeAnalysisChart = () => {
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
        name: "Costs",
        data: [1000, 1200, 1100, 1400, 1500, 1600],
        color: "#3B82F6",
        fillOpacity: 0.0,
        marker: {
          enabled: true,
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
        {/* <MdOutlineAnalytics /> */}
        <h2 className="text-lg font-semibold">Overtime Analysis</h2>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default OvertimeAnalysisChart;
