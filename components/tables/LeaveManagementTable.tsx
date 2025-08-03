import React, { useState } from "react";
import DropdownComponent, { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch, FiUsers } from "react-icons/fi";
import Modal from "../ui/Modal";
import { Form } from "react-final-form";
import { validate } from "validate.js";
import {
  LeaveDetailsProps,
  NewLeaveFormValues,
  ReviewLeaveFormValues,
} from "../types/formFields";
import { addNewEmployeeConstraints } from "../forms/contraints/contraints";
import NewLeaveForm from "../forms/NewLeaveForm";
import { BsClock } from "react-icons/bs";
import ReviewLeaveForm from "../forms/ReviewLeaveForm ";

const LeaveManagementTable = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<
    "add" | "edit" | "review" | "view" | null
  >(null);

  const onSubmit = (values: NewLeaveFormValues | ReviewLeaveFormValues) => {
    console.log(values);
  };

  const validateForm = (values: NewLeaveFormValues | ReviewLeaveFormValues) => {
    return validate(values, addNewEmployeeConstraints) || undefined;
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">Leave Requests</h2>
        <p>View and manage all leave requests</p>
      </div>
      <div className="flex  flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto  bg-gray-50">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="search employee by name or email"
            className=" outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            className="primary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => setIsModalOpen("add")}
          >
            <FiPlus />
            <span>New Leave Request</span>
          </button>

          <DropdownComponent
            options={[
              {
                title: "Approved",
                onClick: () => {},
              },
              {
                title: "Rejected",
                onClick: () => {},
              },
              { title: "Pending", onClick: () => {} },
              { title: "Reimbursed", onClick: () => {} },
            ]}
            label="Status"
            size="sm"
          />
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
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>

              <th scope="col" className="px-6 py-3">
                Days
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
            <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td className="px-6 py-4"> LR001</td>
              <td className="px-6 py-4 flex flex-col gap-2 items-start">
                <span className="text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  John Smith
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                  +44 7700 900123
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Annual
                </span>
              </td>
              <td className="px-6 py-4">15/01/2024</td>
              <td className="px-6 py-4">15/01/2024</td>
              <td className="px-6 py-4">5</td>
              <td className="px-6 py-4">
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                  Approved
                </span>
              </td>
              <td className="px-6 py-4">15/01/2024</td>
              <td className="px-6 py-4 relative">
                <Dropdown
                  options={[
                    {
                      title: "view Details",
                      onClick: () => setIsModalOpen("view"),
                    },
                    {
                      title: "Review",
                      onClick: () => setIsModalOpen("review"),
                    },
                  ]}
                  label="Actions"
                  size="sm"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isModalOpen === "add" && (
        <Modal
          size={"2xl"}
          heading={"Submit Leave Request"}
          desc={
            "Fill in the details for your leave request. Your manager will be notified for approva"
          }
          onClose={() => setIsModalOpen(null)}
          submitBtnText="Add Leave Request"
        >
          <Form<NewLeaveFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <NewLeaveForm
                handleSubmit={handleSubmit}
                form={form}
                submitting={submitting}
              />
            )}
          />
        </Modal>
      )}

      {isModalOpen === "view" && (
        <Modal
          size={"2xl"}
          heading={"Review Leave Request"}
          desc={"Review and approve or reject this leave request"}
          onClose={() => setIsModalOpen(null)}
          secondaryBtnText="Reject"
          secondaryBtnColor="bg-red-500 hover:bg-red-600"
          submitBtnText="Approve"
        >
          <LeaveDetails
            employee="Emily Davis"
            leaveType="Annual"
            startDate="14/01/2024"
            endDate="14/01/2024"
            employeeId="EMP002"
            reason="Family vacation"
            status="Pending"
            submittedDate="14/01/2024"
            approvedBy="Jane Smith"
            approvedDate="14/01/2024"
            duration="5"
          />
          <Form<ReviewLeaveFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <ReviewLeaveForm
                handleSubmit={handleSubmit}
                form={form}
                submitting={submitting}
              />
            )}
          />
        </Modal>
      )}
      {isModalOpen === "review" && (
        <Modal
          size={"2xl"}
          heading={"Review Leave Request"}
          desc={"Review and approve or reject this leave request"}
          onClose={() => setIsModalOpen(null)}
          secondaryBtnText="Reject"
          secondaryBtnColor="bg-red-500 hover:bg-red-600"
          submitBtnText="Approve"
        >
          <LeaveDetails
            employee="Emily Davis"
            leaveType="Annual"
            startDate="14/01/2024"
            endDate="14/01/2024"
            employeeId="EMP002"
            reason="Family vacation"
            status="Pending"
            submittedDate="14/01/2024"
            approvedBy="Jane Smith"
            approvedDate="14/01/2024"
            duration="5"
          />
          <Form<ReviewLeaveFormValues>
            onSubmit={onSubmit}
            validate={validateForm}
            render={({ handleSubmit, form, submitting }) => (
              <ReviewLeaveForm
                handleSubmit={handleSubmit}
                form={form}
                submitting={submitting}
              />
            )}
          />
        </Modal>
      )}
    </div>
  );
};

export default LeaveManagementTable;

export const LeaveDetails = ({
  employee,
  leaveType,
  startDate,
  endDate,
  employeeId,
  reason,
  status,
  submittedDate,
  approvedBy,
  approvedDate,
  duration,
}: LeaveDetailsProps) => {
  return (
    <div className="space-y-4 mb-4 ">
      <div className="grid grid-cols-2 gap-2  ">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
            <FiUsers />
            Employee
          </span>
          <span className="text-sm font-semibold text-black">{employee}</span>
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
            ID: {employeeId}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
            <BsClock />
            Status
          </span>
          <span className="text-xs w-fit font-semibold text-black bg-gray-200 rounded-full px-2 py-1">
            {status}
          </span>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-black pt-2 border-t  border-gray-200">
        Leave Details
      </h2>
      <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Leave Type</span>
          <span className="text-sm font-semibold text-black">{leaveType}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Duration:</span>
          <span className="text-sm font-semibold text-black">{duration}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Start Date</span>
          <span className="text-sm font-semibold text-black">{startDate}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">End Date:</span>
          <span className="text-sm font-semibold text-black">{endDate}</span>
        </div>
      </div>
      <h2 className="text-sm font-semibold text-black">Reason for Leave</h2>
      <div className=" bg-gray-50 p-4 rounded-sm">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">{reason}</span>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-black pt-2 border-t  border-gray-200">
        Submission Details
      </h2>
      <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">
            Submitted Date
          </span>
          <span className="text-sm font-semibold text-black">
            {submittedDate}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">Approved By</span>
          <span className="text-sm font-semibold text-black">{approvedBy}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500 font-medium">
            Approved Date:
          </span>
          <span className="text-sm font-semibold text-black">
            {approvedDate}
          </span>
        </div>
      </div>
    </div>
  );
};
