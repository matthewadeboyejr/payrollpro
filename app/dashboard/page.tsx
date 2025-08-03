"use client";

import React from "react";
import { FiCalendar, FiDollarSign, FiUsers } from "react-icons/fi";
import Cards from "@/components/ui/Cards";
import { RiBillLine } from "react-icons/ri";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import RecentActivity from "@/components/overview/RecentActivity";
import AlertsNotifications from "@/components/overview/AlertsNotifications";
import QuickAction from "@/components/overview/QuickAction";
import AboutPage from "@/components/ui/AboutPage";

const Dashboard = () => {
  return (
    <main className="w-full">
      <AboutPage about="Welcome back! Here's what's happening with your payroll." />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Total Employees"
          icon={<FiUsers />}
          value="247"
          data="+5.2%"
          color="green"
          details="from last month"
        />{" "}
        <Cards
          title="Monthly Payroll"
          icon={<FiDollarSign />}
          value="247"
          data="$10,000"
          color="blue"
          details="from last month"
        />{" "}
        <Cards
          title="Pending Leave"
          icon={<FiCalendar />}
          value="12"
          data="3 urgent"
          color="green"
          details="from last month"
        />
        <Cards
          title="Tax Compliance"
          icon={<RiBillLine />}
          value="100%"
          data=""
          color=""
          details="All submissions on time"
        />
      </section>
      <section className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <BarChart />
        <PieChart />
      </section>
      <section className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <RecentActivity />
        <AlertsNotifications />
      </section>
      <section className="w-full mt-5">
        <QuickAction />
      </section>
    </main>
  );
};

export default Dashboard;
