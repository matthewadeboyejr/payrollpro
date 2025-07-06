import React from "react";
import { CiClock2 } from "react-icons/ci";

const RecentActivity = () => {
  const activity = [
    {
      title: "Payroll processed for June 2024",
      time: "2 hours ago",
      status: "success",
    },
    {
      title: "New employee onboarded: Sarah Wilson",
      time: "5 hours ago",
      status: "warning",
    },
    {
      title: "Tax return submitted for 2023",
      time: "1 day ago",
      status: "pending",
    },
  ];
  return (
    <div className="bg-white p-4 rounded-lg w-full">
      <div className="flex items-center gap-2 mb-5">
        <CiClock2 className="font-bold" />
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="flex flex-col gap-2">
        {activity.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 bg-gray-100 p-2 rounded-lg"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                item.status === "success"
                  ? "bg-green-400"
                  : item.status === "pending"
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }`}
            ></div>
            <p className="text-xs text-gray-500 flex flex-col  gap-1">
              <span className="font-semibold text-black">{item.title}</span>
              <span className="text-gray-500">{item.time}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
