import React from "react";
import Link from "next/link";
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
      link: "/dashboard/employees-management",
    },
    {
      title: "Leave Request",
      icon: <IoCalendarClearOutline />,
      link: "/dashboard/leave-management",
    },
    {
      title: "Rota Schedule",
      icon: <FaRegClock />,
      link: "/dashboard/rota-scheduling",
    },
    {
      title: "Expense Claim",
      icon: <RiMoneyDollarCircleLine />,
      link: "/dashboard/expense-management",
    },
    {
      title: "Run Payroll",
      icon: <CiMoneyBill />,
      link: "/dashboard/payroll-wages",
    },
    {
      title: "Tax Report",
      icon: <RiBillLine />,
      link: "/dashboard/tax-management",
    },
  ];
  return (
    <div className="bg-white p-4 rounded-lg w-full dark:bg-gray-800">
      <div className="flex items-center gap-2 mb-5">
        <CiClock2 className="font-bold dark:text-white" />
        <h2 className="text-lg font-semibold dark:text-white">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {activity.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex items-center justify-between gap-5 bg-blue-100 p-2 rounded-lg w-full hover:bg-blue-200 transition-all duration-300 cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 text-blue-500 border-blue-500 border p-2 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-blue-300">
                {item.icon}
              </div>
              <p className="text-xs text-black dark:text-white">{item.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <IoIosArrowForward className="text-xs text-black dark:text-white" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAction;
