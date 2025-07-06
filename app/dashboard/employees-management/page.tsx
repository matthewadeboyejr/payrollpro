"use client";

import React from "react";
import { FiUsers } from "react-icons/fi";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { LuUserCheck, LuUserX } from "react-icons/lu";
import EmployeeManagementTable from "@/components/tables/EmployeeManagementTable";

const EmployeesManagement = () => {
  return (
    <main className="w-full">
      <AboutPage about="Manage your team members and their information" />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Total Employees"
          icon={<FiUsers />}
          value="3"
          data=""
          color="green"
          details=""
        />{" "}
        <Cards
          title="Active Employees"
          icon={<LuUserCheck />}
          value="2"
          data=""
          color=""
          details=""
        />{" "}
        <Cards
          title="On Leave Employees"
          icon={<LuUserX />}
          value="1"
          data=""
          color="green"
          details=""
        />
        <Cards
          title="Inactive Employees"
          icon={<LuUserX />}
          value="0"
          data=""
          color=""
          details=""
        />
      </section>

      <section className="w-full mt-5">
        <EmployeeManagementTable />
      </section>
    </main>
  );
};

export default EmployeesManagement;
