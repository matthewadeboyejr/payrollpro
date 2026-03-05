import React, { useState } from "react";
import DropdownComponent, { Dropdown } from "../ui/Dropdown";
import { FiSearch } from "react-icons/fi";
import Modal from "../ui/Modal";

import { useGetLeaveRequestQuery } from "@/services/api/constants/Leave.constant";
import { getLeave, LeaveDetails as LeaveDetailsType } from "../types/Leave";
import { formatDT } from "@/utils/formatDT";
import StatusBadge from "@/utils/StatusBadge";
import ReviewLeaveRequest from "../leaveManagement/sub-component/ReviewLeaveRequest";

import { useModal } from "@/context/ModalContext";
import UsersTableSkeleton from "../ui/UsersTableSkeleton";
import LeaveDetails from "../leaveManagement/sub-component/LeaveDetails";
import { useDebounce } from "@/hooks/useDebounce";

const LeaveManagementTable = () => {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { data, isLoading } = useGetLeaveRequestQuery({
    search: debouncedSearch,
    status, // "" means all
  });

  const [initialValues, setInitialValues] = useState<getLeave | null>(null);
  const { isModalOpen, setIsModalOpen } = useModal();

  const leaveRequests = data?.data;

  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm dark:bg-gray-800">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold dark:text-white">Leave Requests</h2>
        <p className="dark:text-gray-400">View and manage all leave requests</p>
      </div>
      <div className="flex  flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <FiSearch className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="search employee by name or email"
            className=" outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm w-full bg-transparent dark:text-white dark:placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/*  <button
            className="primary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => setIsModalOpen("add")}
          >
            <FiPlus />
            <span>New Leave Request</span>
          </button> */}

          <DropdownComponent
            options={[
              {
                title: "All",
                onClick: () => setStatus(""),
              },
              {
                title: "Approved",
                onClick: () => setStatus("Approved"),
              },
              {
                title: "Rejected",
                onClick: () => setStatus("Rejected"),
              },
              {
                title: "Pending",
                onClick: () => setStatus("pending"),
              },
            ]}
            label="Status"
            size="sm"
          />
          <button
            className="secondary-btn px-4 py-2 border rounded-sm"
            onClick={() => {
              setSearch("");
              setStatus("");
            }}
          >
            Clear Filters
          </button>
          {/*    <button
            className="secondary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => {
              console.log("export");
            }}
          >
            <span>
              <BiExport className="text-blue-500" />
            </span>
            <span>Export</span>
          </button> */}
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Request ID
              </th>
              <th scope="col" className="px-6 py-3">
                Employee
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Start
              </th>
              <th scope="col" className="px-6 py-3">
                End
              </th>

              <th scope="col" className="px-6 py-3">
                Days
              </th>
              <th scope="col" className="px-6 py-3">
                Hours
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Submitted
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests?.map((request: getLeave) => {
              const { date: startDate } = formatDT(request?.startDate || "");
              const { date: endDate } = formatDT(request?.endDate || "");
              const { date: submitDate } = formatDT(request?.createdAt || "");
              return (
                <tr
                  className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-nowrap"
                  key={request?.id}
                >
                  <td className="px-6 py-4 text-nowrap">
                    {" "}
                    {request?.requestNo}
                  </td>
                  <td className="px-6 py-4 flex flex-col gap-2 items-start">
                    <span className="text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {request?.employeeName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={request?.leaveType} />
                  </td>
                  <td className="px-6 py-4">{startDate}</td>
                  <td className="px-6 py-4">{endDate}</td>
                  <td className="px-6 py-4">{request?.dayRequested || "-"}</td>
                  <td className="px-6 py-4">
                    {request?.hoursRequested || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {request?.remainingBalance || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={request?.status} />
                  </td>
                  <td className="px-6 py-4 ">{submitDate}</td>
                  <td className="px-6 py-4 relative">
                    <Dropdown
                      options={[
                        {
                          title: "View Details",
                          onClick: () => {
                            setInitialValues(request);
                            setIsModalOpen("view");
                          },
                        },
                        ...(request?.status?.toLowerCase() !== "approved" &&
                          request?.status?.toLowerCase() !== "rejected"
                          ? [
                            {
                              title: "Review",
                              onClick: () => {
                                setInitialValues(request);
                                setIsModalOpen("review-leaveRequest");
                              },
                            },
                          ]
                          : []),
                      ]}
                      label="Actions"
                      size="sm"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen === "view" && initialValues && (
        <Modal
          size={"2xl"}
          heading={"Employee Leave Request Details"}
          desc={"check below the details of this employee request"}
          onClose={() => setIsModalOpen(null)}
          showSubmitBtn={false}
        >
          <LeaveDetails initialValues={initialValues as LeaveDetailsType} />
        </Modal>
      )}
      {isModalOpen === "review-leaveRequest" && initialValues && (
        <ReviewLeaveRequest initialValues={initialValues as LeaveDetailsType} />
      )}
    </div>
  );
};

export default LeaveManagementTable;
