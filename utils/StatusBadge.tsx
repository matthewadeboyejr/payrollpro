import React from "react";
import { GoDotFill } from "react-icons/go";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800  ",
  inactive: "bg-red-100 text-red-800",
  Inactive: "bg-red-100 text-red-800",
  active: "bg-green-100 text-green-800",
  Active: "bg-green-100 text-green-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800  ",
  "Annual Leave": "bg-blue-100 text-blue-800",
  "Sick Leave": "bg-red-100 text-red-800",
  "Personal Leave": "bg-purple-100 text-purple-800",
  "Maternity Leave": "bg-green-100 text-green-800",

  //DRAFT: "bg-gray-100 text-gray-800 ",
};

const StatusBadge = ({ status }: { status: string }) => {
  if (!status) return null;

  const normalizedStatus = status;
  const colorClass =
    statusColors[normalizedStatus as keyof typeof statusColors] ||
    "bg-gray-200 text-gray-800";

  return (
    <span
      className={`px-3 py-1 text-sm capitalize font-medium  rounded-full ${colorClass} flex items-center w-fit gap-1 text-nowrap`}
    >
      {/* <GoDotFill /> */}
      {normalizedStatus}
    </span>
  );
};

export default StatusBadge;
