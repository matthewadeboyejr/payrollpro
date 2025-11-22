"use client";

import React from "react";
import { FiUsers } from "react-icons/fi";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { LuUserCheck, LuUserX } from "react-icons/lu";
import EmployeeManagementTable from "@/components/tables/EmployeeManagementTable";
import { useGetEmployeesSummaryQuery } from "@/services/api/constants/employee.constant";

const EmployeesManagement = () => {
  const { data } = useGetEmployeesSummaryQuery(undefined);

  const summary = data?.data;
  return (
    <main className="w-full">
      <AboutPage about="Manage your team members and their information" />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Total Employees"
          icon={<FiUsers />}
          value={summary?.totalEmployees || "-"}
          data=""
          color="green"
          details=""
        />{" "}
        <Cards
          title="Active Employees"
          icon={<LuUserCheck />}
          value={summary?.activeEmployees || "-"}
          data=""
          color=""
          details=""
        />{" "}
        <Cards
          title="Inactive Employees"
          icon={<LuUserX />}
          value={summary?.inactiveEmployees || "-"}
          data=""
          color=""
          details=""
        />
        <Cards
          title="On Leave Employees"
          icon={<LuUserX />}
          value={summary?.onLeaveEmployees || "-"}
          data=""
          color="green"
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
