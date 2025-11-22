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
} from "@/services/api/constants/Leave.constant";
import { getLeave } from "@/components/types/Leave";

const LeaveManagement = () => {
  const [tab, setTab] = useState<"table" | "calendar">("table");
  const { data: summaryData, isLoading: isLoadingSummary } =
    useGetLeaveRequestSummaryQuery(undefined);
  const { data: leaveRequestsData, isLoading: isLoadingLeaveRequests } =
    useGetLeaveRequestQuery({ search: "", status: "" });

  const summary = summaryData?.data;
  const leaveRequests = leaveRequestsData?.data || [];

  // Transform leave request data for calendar
  const calendarData = useMemo(() => {
    const statusColorMap: Record<string, string> = {
      approved: "#22c55e", // green
      rejected: "#ef4444", // red
      pending: "#f59e0b", // amber
      reimbursed: "#3b82f6", // blue
    };

    return leaveRequests.map((request: getLeave) => ({
      id: request.id,
      title: `${request.employeeName} - ${request.leaveType}`,
      employeeId: request.id, // Using id as fallback
      leaveTypeId: request.id, // Using id as fallback
      requestNo: request.requestNo,
      start: request.startDate,
      end: request.endDate,
      status: request.status?.toLowerCase() || "pending",
      color:
        statusColorMap[request.status?.toLowerCase() || "pending"] || "#6b7280",
      // Include all fields needed for modal display
      employeeName: request.employeeName,
      leaveType: request.leaveType,
      startDate: request.startDate,
      endDate: request.endDate,
      reason: request.reason,
      comment: request.comment,
      approvedBy: request.approvedBy,
      days: request.days,
      remainingBalance: request.remainingBalance,
      createdAt: request.createdAt,
      approvedDate: "", // Not available in getLeave, will be empty
    }));
  }, [leaveRequests]);

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
          //data="+2"
          //color=""
          //details="from last month"
        />{" "}
        <Cards
          title="Total Days Approved"
          icon={<IoCalendarClearOutline />}
          value={summary?.totalDaysApproved || "-"}
          //data=""
          //color="green"
          //details="This year"
        />
        <Cards
          title="Average Days/Request"
          icon={<IoCalendarClearOutline />}
          value={summary?.averageDaysPerRequest || "-"}
          //data=""
          //color=""
          //details="Per approved request"
        />
      </section>
      {/*    <LeaveBalance /> */}

      <section className="flex gap-5 flex-col md:flex-row  w-full mt-5">
        <div className="bg-white p-5 rounded-md flex gap-2 border border-gray-200">
          <button
            onClick={() => setTab("table")}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 ${
              tab === "table"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Table
          </button>

          <button
            onClick={() => setTab("calendar")}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 ${
              tab === "calendar"
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
