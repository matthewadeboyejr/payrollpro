"use client";

import React from "react";
import { FiActivity, FiDollarSign, FiUsers } from "react-icons/fi";
import Cards from "@/components/ui/Cards";
import { RiBillLine } from "react-icons/ri";
import PieChart from "@/components/charts/PieChart";
import AboutPage from "@/components/ui/AboutPage";
import LiveChart from "@/components/charts/LiveChart";
import TaxDeductionsBreakdownChart from "@/components/charts/TaxDeductionsBreakdownChart ";
import OvertimeAnalysisChart from "@/components/charts/OvertimeAnalysisChart";
import PerformanceSummary from "@/components/reports/PerformanceSummary";
import RecentReport from "@/components/reports/RecentReport";

const ReportsAnalytics = () => {
  return (
    <main className="w-full">
      <AboutPage about="Welcome back! Here's what's happening with your payroll." />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Total Payroll Cost"
          icon={<FiDollarSign />}
          value="247"
          data="+2.9% from last month"
          color="green"
        />{" "}
        <Cards
          title="Average Salary"
          icon={<FiUsers />}
          value="247"
          data="+2.9% from last month"
          color="green"
        />{" "}
        <Cards
          title="Tax Deductions"
          icon={<RiBillLine />}
          value="£82,500"
          details="29.5% of gross pay"
        />
        <Cards
          title="Overtime Costs"
          icon={<FiActivity />}
          value="£5,875"
          data="+14.6% from last month"
          color="red"
        />
      </section>
      <section className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <LiveChart />
        <PieChart />
        <TaxDeductionsBreakdownChart />
        <OvertimeAnalysisChart />
      </section>
      <PerformanceSummary />
      <RecentReport />
    </main>
  );
};

export default ReportsAnalytics;
