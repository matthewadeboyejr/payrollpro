"use client";

import React, { useState, useMemo } from "react";
import Cards from "@/components/ui/Cards";
import AboutPage from "@/components/ui/AboutPage";
import { IoCalendarClearOutline } from "react-icons/io5";
import LeaveManagementTable from "@/components/tables/LeaveManagementTable";
import LeaveCalendar from "@/components/leaveManagement/LeaveCalendar";

import {
  useGetLeaveRequestSummaryQuery,
  useGetLeaveRequestQuery,
  useGetLeaveRequestCalendarQuery,
} from "@/services/api/constants/Leave.constant";
import { getLeaveCalendar } from "@/components/types/Leave";

const LeaveManagement = () => {
  const [tab, setTab] = useState<"table" | "calendar">("table");
  const { data: summaryData } = useGetLeaveRequestSummaryQuery(undefined);
  const { isLoading: isLoadingLeaveRequests } =
    useGetLeaveRequestQuery({ search: "", status: "" });
  const { data: calendarResponse } =
    useGetLeaveRequestCalendarQuery(undefined);

  const summary = summaryData?.data;

  const calendarData = useMemo(() => {
    const leaveRequests = calendarResponse?.data || [];

    return leaveRequests.map((request: getLeaveCalendar) => ({
      id: request.id,
      title: `${request.title}`,
      employeeId: request.employeeId, // Using id as fallback
      leaveTypeId: request.leaveTypeId, // Using id as fallback
      requestNo: request.requestNo,
      start: request.start,
      end: request.end,
      status: request.status?.toLowerCase(),
      color: request?.color,
    }));
  }, [calendarResponse]);

  return (
    <main className="w-full">
      <AboutPage about="Manage employee leave requests and track working hours" />
      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <Cards
          title="Pending Requests"
          icon={<IoCalendarClearOutline />}
          value={summary?.totalPending || "-"}
        //data=""
        //color="green"
        //details="Awaiting approval"
        />{" "}
        <Cards
          title="Approved This Month"
          icon={<IoCalendarClearOutline />}
          value={summary?.totalApprovedThisMonth || "-"}
        />{" "}
        <Cards
          title="Total Days Approved"
          icon={<IoCalendarClearOutline />}
          value={summary?.totalDaysApproved || "-"}
        />
        <Cards
          title="Average Days/Request"
          icon={<IoCalendarClearOutline />}
          value={summary?.averageDaysPerRequest || "-"}
        />
      </section>
      {/*    <LeaveBalance /> */}

      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <div className="bg-white p-5 rounded-md flex gap-2 border border-gray-200">
          <button
            onClick={() => setTab("table")}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 ${tab === "table"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            Table
          </button>

          <button
            onClick={() => setTab("calendar")}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 ${tab === "calendar"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            Calendar
          </button>
        </div>
      </section>

      <section className="w-full mt-5">
        {tab === "table" ? (
          <LeaveManagementTable />
        ) : (
          <div className="bg-white p-5 rounded-md">
            {isLoadingLeaveRequests ? (
              <div className="flex items-center justify-center h-96">
                <p className="text-gray-500">Loading calendar...</p>
              </div>
            ) : (
              <LeaveCalendar data={calendarData} />
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default LeaveManagement;
