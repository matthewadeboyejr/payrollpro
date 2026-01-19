"use client";

import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import RotaAndSchedulingTable from "@/components/tables/RotaAndSchedulingTable";
import { useShift } from "@/context/ShiftContext";
import Rota from "@/components/shift-rota/Rota";
const RotaAndScheduling = () => {
  const [tab, setTab] = useState<"shift" | "rota">("shift");
  const { rota } = useShift();

  console.log("rota", rota);
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
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <div className="bg-white p-5 rounded-md flex gap-2 border border-gray-200">
          <button
            onClick={() => setTab("shift")}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 ${
              tab === "shift"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Shifts
          </button>

          <button
            onClick={() => setTab("rota")}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 ${
              tab === "rota"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Rotas
          </button>
        </div>
      </section>
      <section className="w-full mt-5 ">
        {tab === "shift" ? <RotaAndSchedulingTable /> : <Rota />}
      </section>
    </main>
  );
};

export default RotaAndScheduling;
