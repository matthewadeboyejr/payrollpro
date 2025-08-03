import { CiSettings, CiMoneyBill } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FiCreditCard, FiHome, FiUser } from "react-icons/fi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import {
  RiBillLine,
  RiMoneyDollarCircleLine,
  RiShieldLine,
  RiMapPinLine,
} from "react-icons/ri";

const menus = [
  {
    title: "Main",
    submenus: [
      {
        id: "overview",
        role: "admin",
        label: "Overview",
        icon: <FiHome />,
        url: "/dashboard",
      },
      {
        id: "employees-management",
        role: "admin",
        label: "Employees Management",
        icon: <FiUser />,
        url: "/dashboard/employees-management",
      },
    ],
  },
  {
    title: "Core Modules",
    submenus: [
      {
        id: "leave-management",
        role: "admin",
        label: "Leave Management",
        icon: <IoCalendarClearOutline />,
        url: "/dashboard/leave-management",
      },
      {
        id: "rota-scheduling",
        role: "admin",
        label: "Rota & Scheduling",
        icon: <FaRegClock />,
        url: "/dashboard/rota-scheduling",
      },
      {
        id: "expense-management",
        role: "admin",
        label: "Expense Management",
        icon: <RiMoneyDollarCircleLine />,
        url: "/dashboard/expense-management",
      },
      {
        id: "payroll-wages",
        role: "admin",
        label: "Payroll & Wages",
        icon: <CiMoneyBill />,
        url: "/dashboard/payroll-wages",
      },
      {
        id: "tax-management",
        role: "admin",
        label: "Tax Management",
        icon: <RiBillLine />,
        url: "/dashboard/tax-management",
      },
      {
        id: "payslip",
        role: "admin",
        label: "Payslip",
        icon: <FiCreditCard />,
        url: "/dashboard/payslip-management",
      },
    ],
  },
  {
    title: "Analytics & Integrations",
    submenus: [
      {
        id: "reports-analytics",
        role: "admin",
        label: "Reports & Analytics",
        icon: <MdOutlineAnalytics />,
        url: "/dashboard/reports-analytics",
      },
      {
        id: "geolocation",
        role: "admin",
        label: "Geolocation",
        icon: <RiMapPinLine />,
        url: "/dashboard/geolocation",
      },
    ],
  },
  {
    title: "System ",
    submenus: [
      {
        id: "compliance",
        role: "admin",
        label: "Compliance",
        icon: <RiShieldLine />,
        url: "/dashboard/compliance",
      },
      {
        id: "settings",
        role: "admin",
        label: "Settings",
        icon: <CiSettings />,
        url: "/dashboard/settings",
      },
    ],
  },
];

export default menus;
