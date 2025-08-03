"use client";

import React from "react";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { FaRegFileLines } from "react-icons/fa6";
import { TbInfoTriangle } from "react-icons/tb";
import TaxManagementTable from "@/components/tables/TaxManagementTable";
const TaxManagement = () => {
  return (
    <main className="w-full">
      <AboutPage about="Manage PAYE, National Insurance, and tax submissions" />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Total PAYE"
          icon={<FaRegFileLines />}
          value="£3,265"
          data=""
          color="green"
          details="Current period"
        />{" "}
        <Cards
          title="Employee NI"
          icon={<FaRegFileLines />}
          value="£1,633"
          data=""
          color=""
          details="Employee contributions"
        />{" "}
        <Cards
          title="Tax Deductions"
          icon={<FaRegFileLines />}
          value="£3,265"
          data=""
          color="green"
          details="Employer contributions"
        />
        <Cards
          title="Pending Submissions"
          icon={<TbInfoTriangle />}
          value="1"
          data=""
          color="green"
          details="Awaiting submission"
        />
      </section>

      <section className="w-full mt-5">
        <TaxManagementTable />
      </section>
    </main>
  );
};

export default TaxManagement;
