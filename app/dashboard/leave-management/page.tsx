"use client";

import React from "react";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { IoCalendarClearOutline } from "react-icons/io5";
import LeaveManagementTable from "@/components/tables/LeaveManagementTable";

import LeaveBalance from "@/components/leaveManagement/LeaveBalance";
const LeaveManagement = () => {
  return (
    <main className="w-full">
      <AboutPage about="Manage employee leave requests and track working hours" />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Pending Requests"
          icon={<IoCalendarClearOutline />}
          value="1"
          data=""
          color="green"
          details="Awaiting approval"
        />{" "}
        <Cards
          title="Approved This Month"
          icon={<IoCalendarClearOutline />}
          value="2"
          data="+2"
          color=""
          details="from last month"
        />{" "}
        <Cards
          title="Total Days Approved"
          icon={<IoCalendarClearOutline />}
          value="184"
          data=""
          color="green"
          details="This year"
        />
        <Cards
          title="Average Days/Request"
          icon={<IoCalendarClearOutline />}
          value="92"
          data=""
          color=""
          details="Per approved request"
        />
      </section>
      <LeaveBalance />

      <section className="w-full mt-5">
        <LeaveManagementTable />
      </section>
    </main>
  );
};

export default LeaveManagement;
