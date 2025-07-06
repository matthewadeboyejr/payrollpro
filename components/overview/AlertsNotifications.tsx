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
    <div className="bg-white p-4 rounded-lg w-full">
      <div className="flex items-center gap-2 mb-5">
        <IoIosInformationCircleOutline className="font-bold" />
        <h2 className="text-lg font-semibold">Alerts & Notifications</h2>
      </div>
      <div className="flex flex-col gap-2">
        {alerts.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-5 p-2 rounded-lg  ${
              item.status === "success"
                ? "bg-green-50 border-green-500 text-green-700"
                : item.status === "warning"
                ? "bg-yellow-50 border-yellow-500 text-yellow-700"
                : "bg-red-50 border-red-500 text-red-700"
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
