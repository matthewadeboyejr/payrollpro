import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";

const AlertsNotifications = () => {
  const alerts = [
    {
      title: "HMRC submission deadline in 3 days",
      detail: "Corporation Tax filing due",
      status: "success",
    },
    {
      title: "3 leave requests pending approval",
      detail: "Review required",
      status: "warning",
    },
    {
      title: "Monthly backup completed",
      detail: "All data secured",
      status: "pending",
    },
  ];
  return (
    <div className="bg-white p-4 rounded-lg w-full dark:bg-gray-800">
      <div className="flex items-center gap-2 mb-5">
        <IoIosInformationCircleOutline className="font-bold dark:text-white" />
        <h2 className="text-lg font-semibold dark:text-white">Alerts & Notifications</h2>
      </div>
      <div className="flex flex-col gap-2">
        {alerts.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-5 p-2 rounded-lg border ${item.status === "success"
                ? "bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
                : item.status === "warning"
                  ? "bg-yellow-50 border-yellow-500 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400"
                  : "bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
              }`}
          >
            <div>
              <IoIosInformationCircleOutline />
            </div>
            <p className="text-xs  flex flex-col  gap-1">
              <span className="font-semibold ">{item.title}</span>
              <span className="">{item.detail}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsNotifications;
