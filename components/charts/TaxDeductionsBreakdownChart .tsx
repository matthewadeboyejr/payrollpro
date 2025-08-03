"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TaxDeductionsBreakdownChart = () => {
  const options = {
    chart: {
      type: "column",
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
        name: "PAYE",
        data: [5000, 6000, 5500, 7000, 7500, 8000],
        color: "#3B82F6",
      },
      {
        name: "National Insurance",
        data: [2000, 2500, 2200, 3000, 3500, 4000],
        color: "#12B981",
      },
      {
        name: "Pension",
        data: [4000, 5000, 4500, 6000, 6500, 7000],
        color: "#F69E0B",
      },
    ],
  };
  return (
    <div className="bg-white p-4 rounded-lg w-full">
      <div className="flex items-center gap-2 mb-5">
        {/* <MdOutlineAnalytics /> */}
        <h2 className="text-lg font-semibold">Monthly Payroll & Tax Trends</h2>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TaxDeductionsBreakdownChart;
