"use client";

import React from "react";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { FaRegClock } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { BiEuro } from "react-icons/bi";
import PayrollAndWagesTable from "@/components/tables/PayrollAndWages";
const ExpenseManagement = () => {
  return (
    <main className="w-full">
      <AboutPage about="Track and manage employee expenses" />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Total Gross Pay"
          icon={<BiEuro />}
          value="£16,6670"
          data=""
          color="green"
          details="Current period"
        />{" "}
        <Cards
          title="Total Net Pay"
          icon={<BiEuro />}
          value="£11,719"
          data=""
          color=""
          details="After deductions"
        />{" "}
        <Cards
          title="Tax Deductions"
          icon={<RiBillLine />}
          value="£3,265"
          data=""
          color="green"
          details="PAYE + NI"
        />
        <Cards
          title="Pending"
          icon={<FaRegClock />}
          value="1"
          data=""
          color="green"
          details="Awaiting processing"
        />
      </section>

      <section className="w-full mt-5">
        <PayrollAndWagesTable />
      </section>
    </main>
  );
};

export default ExpenseManagement;
