import React from "react";
import { BiCheck, BiDownload, BiFile } from "react-icons/bi";
import { FaRegChartBar } from "react-icons/fa";
import { IoPieChartOutline } from "react-icons/io5";

const RecentReport = () => {
  const recentReportData = [
    {
      title: "June 2024 Payroll Analytics",
      time: "Generated 2 hours ago",
      icon: <BiFile className="text-blue-500" />,
    },
    {
      title: "Q2 2024 Department Analysis",
      time: "Generated yesterday",
      icon: <FaRegChartBar className="text-green-500" />,
    },
    {
      title: "Tax Compliance Report",
      time: "Generated 3 days ago",
      icon: <IoPieChartOutline className="text-orange-500" />,
    },
  ];
  return (
    <section className="bg-white p-4 rounded-lg w-full mt-5">
      <div className="flex items-center gap-2 mb-5">
        {/* <CiClock2 className="font-bold" /> */}
        <h2 className="text-lg font-semibold">Recent Reports</h2>
      </div>
      <div className="flex flex-col gap-2">
        {recentReportData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 bg-gray-100 md:p-5 p-2 rounded-lg"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-2xl">{item.icon}</div>
                <p className="text-xs text-gray-500 flex  flex-col   gap-1 justify-between w-full">
                  <span className="font-semibold text-black text-lg">
                    {item.title}
                  </span>
                  <span className="  text-sm">{item.time}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-xs text-green-800 font-semibold bg-green-100 px-2 py-1 rounded-full flex items-center gap-2">
                  <BiCheck className="text-green-800" />
                  Ready
                </p>
                <button className="bg-white hover:bg-gray-100 border border-gray-200 text-black px-4 py-2 rounded-md flex items-center gap-2">
                  <BiDownload className="text-black" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentReport;
