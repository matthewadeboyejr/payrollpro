"use client";

import React from "react";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { FaRegClock, FaRegEnvelope } from "react-icons/fa";
import PayslipManagementTable from "@/components/tables/PayslipManagementTable";
import { FiFile } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
const PayslipManagement = () => {
  return (
    <main className="w-full">
      <AboutPage about="Generate, distribute, and track employee payslips" />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Total Generated"
          icon={<FiFile />}
          value="3"
          data=""
          color="green"
          details="Current period"
        />{" "}
        <Cards
          title="Sent to Employees"
          icon={<FaRegEnvelope />}
          value="2"
          data=""
          color=""
          details="Successfully delivered"
        />{" "}
        <Cards
          title="Viewed by Employees"
          icon={<BsEye />}
          value="1"
          data=""
          color="green"
          details="Confirmed receipt"
        />
        <Cards
          title="Pending Generation"
          icon={<FaRegClock />}
          value="0"
          data=""
          color="green"
          details="Awaiting processing"
        />
      </section>

      <section className="w-full mt-5">
        <PayslipManagementTable />
      </section>
    </main>
  );
};

export default PayslipManagement;
