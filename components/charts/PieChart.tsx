"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FiUsers } from "react-icons/fi";
import { useTheme } from "next-themes";

const PieChart = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "Click slices to view details",
      style: {
        color: isDark ? "#9ca3af" : "#666666",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        borderColor: isDark ? "#1f2937" : "#ffffff", // Match gray-800 or white border
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f} %",
          style: {
            color: isDark ? "#d1d5db" : "#333333",
            textOutline: "none",
          },
        },
        showInLegend: true,
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
    series: [
      {
        name: "Departments",
        colorByPoint: true,
        data: [
          {
            name: "Sales",
            y: 25,
            drilldown: "sales",
          },
          {
            name: "Engineering",
            y: 35,
            drilldown: "engineering",
          },
          {
            name: "Marketing",
            y: 20,
            drilldown: "marketing",
          },
          {
            name: "HR",
            y: 10,
            drilldown: "hr",
          },
          {
            name: "Finance",
            y: 10,
            drilldown: "finance",
          },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          id: "sales",
          name: "Sales Department",
          data: [
            ["Regional Sales", 15],
            ["Online Sales", 10],
          ],
        },
        {
          id: "engineering",
          name: "Engineering Department",
          data: [
            ["Software", 20],
            ["Hardware", 15],
          ],
        },
        {
          id: "marketing",
          name: "Marketing Department",
          data: [
            ["Digital Marketing", 10],
            ["Content Marketing", 10],
          ],
        },
        {
          id: "hr",
          name: "HR Department",
          data: [
            ["Recruitment", 5],
            ["Employee Relations", 5],
          ],
        },
        {
          id: "finance",
          name: "Finance Department",
          data: [
            ["Accounting", 5],
            ["Budgeting", 5],
          ],
        },
      ],
    },
  };
  return (
    <div className="bg-white p-4 rounded-lg w-full dark:bg-gray-800">
      <div className="flex items-center gap-2 mb-5">
        <FiUsers className="dark:text-white" />
        <h2 className="text-lg font-semibold dark:text-white">Department Cost Distribution</h2>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
