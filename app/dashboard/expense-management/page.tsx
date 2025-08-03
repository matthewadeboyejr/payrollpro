"use client";

import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { FaRegClock } from "react-icons/fa";
import ExpenseManagementTable from "@/components/tables/ExpenseManagementTable";
import { FaArrowTrendUp } from "react-icons/fa6";
import { RiBillLine } from "react-icons/ri";
const ExpenseManagement = () => {
  return (
    <main className="w-full">
      <AboutPage about="Track and manage employee expenses" />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Total Expenses"
          icon={<RiBillLine />}
          value="£2,035.50"
          data=""
          color="green"
          details="All time"
        />{" "}
        <Cards
          title="This Month"
          icon={<FaArrowTrendUp />}
          value="£0.00"
          data=""
          color=""
          details="Current month spending"
        />{" "}
        <Cards
          title="Pending Approval"
          icon={<FaRegClock />}
          value="1"
          data="Require attention"
          color="green"
          details="Awaiting approval"
        />
        <Cards
          title="Approved"
          icon={<FiCheckCircle />}
          value="1"
          data=""
          color="green"
          details="Ready for reimbursement"
        />
      </section>

      <section className="w-full mt-5">
        <ExpenseManagementTable />
      </section>
    </main>
  );
};

export default ExpenseManagement;
