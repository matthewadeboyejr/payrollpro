"use client";

import React from "react";
import { FiUsers } from "react-icons/fi";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import RotaAndSchedulingTable from "@/components/tables/RotaAndSchedulingTable";
const RotaAndScheduling = () => {
  return (
    <main className="w-full">
      <AboutPage about="Manage employee schedules and track working hours" />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Total Hours"
          icon={<FaRegClock />}
          value="24"
          data=""
          color="green"
          details="Scheduled for this week"
        />{" "}
        <Cards
          title="Active Shifts"
          icon={<FiUsers />}
          value="1"
          data="1 completed"
          color=""
          details=""
        />{" "}
        <Cards
          title="Absences"
          icon={<IoCalendarClearOutline />}
          value="1"
          data="Require attention"
          color="green"
          details=""
        />
        <Cards
          title="Coverage"
          icon={<FaRegClock />}
          value="0"
          data="All departments covered"
          color=""
          details=""
        />
      </section>

      <section className="w-full mt-5">
        <RotaAndSchedulingTable />
      </section>
    </main>
  );
};

export default RotaAndScheduling;
