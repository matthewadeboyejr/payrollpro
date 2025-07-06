import React from "react";
import { CiClock2, CiMoneyBill } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { IoCalendarClearOutline } from "react-icons/io5";
import { RiBillLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { TiUserAddOutline } from "react-icons/ti";

const QuickAction = () => {
  const activity = [
    {
      title: "Add Employee",
      icon: <TiUserAddOutline />,
    },
    {
      title: "Leave Request",
      icon: <IoCalendarClearOutline />,
    },
    {
      title: "Rota Schedule",
      icon: <FaRegClock />,
    },
    {
      title: "Expense Claim",
      icon: <RiMoneyDollarCircleLine />,
    },
    {
      title: "Run Payroll",
      icon: <CiMoneyBill />,
    },
    {
      title: "Tax Report",
      icon: <RiBillLine />,
    },
  ];
  return (
    <div className="bg-white p-4 rounded-lg w-full">
      <div className="flex items-center gap-2 mb-5">
        <CiClock2 className="font-bold" />
        <h2 className="text-lg font-semibold">Quick Actions</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        {activity.map((item, index) => (
          <button
            key={index}
            className="flex items-center justify-between gap-5 bg-blue-100 p-2 rounded-lg w-full hover:bg-blue-200 transition-all duration-300 cursor-pointer flex-1"
          >
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 text-blue-500 border-blue-500 border p-2 rounded-lg">
                {item.icon}
              </div>
              <p className="text-xs text-black">{item.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <IoIosArrowForward className="text-xs text-black" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAction;
