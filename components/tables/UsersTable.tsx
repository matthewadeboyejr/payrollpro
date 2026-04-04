import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch, FiUserCheck } from "react-icons/fi";
import { useGetUsersQuery } from "@/services/api/constants/auth.constant";
import EmptyState from "../ui/EmptyState";

import { formatDT } from "@/utils/formatDT";
import StatusBadge from "@/utils/StatusBadge";

import UsersTableSkeleton from "../ui/UsersTableSkeleton";

import AddUser from "../settings/sub-component/AddUser";
import { useModal } from "@/context/ModalContext";
import EditUser from "../settings/sub-component/EditUser";
import { useAction } from "@/hooks/useAction";
import ViewUser from "../settings/sub-component/ViewUser";
import { EditUserFormValues } from "../types/formFields";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  roles?: string[];
  createdAt?: string;
  status?: string;
  roleIds?: string[];
}

const UsersTable = () => {
  const { deactivate } = useAction();
  const { isModalOpen, setIsModalOpen } = useModal();
  const [search, setSearch] = useState("");

  const [initialValues, setInitialValues] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data, isLoading } = useGetUsersQuery(undefined);

  const users = data?.data;

  // Show skeleton while loading
  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm dark:bg-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <FiSearch className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="search user by name or email"
            className="w-full outline-none  focus:outline-none focus:ring-focus focus:ring-focus text-sm bg-transparent dark:text-white dark:placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            className="primary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => {
              setIsModalOpen("add");
            }}
          >
            <FiPlus />
            <span>Add User</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>

              <th scope="col" className="px-6 py-3">
                Role(s)
              </th>
              <th scope="col" className="px-6 py-3">
                Created Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User, index: number) => {
              const fullName = user.firstName + " " + user.lastName;
              const { date: createdDate } = formatDT(user.createdAt || "");
              const status = user?.status?.toLowerCase() || "-";

              return (
                <tr
                  className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  key={user.id}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1 || "-"}
                  </td>
                  <td className="px-6 py-4 flex flex-col gap-2 items-start">
                    <span className="text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {fullName}
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                      {user.phoneNumber || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.email || "-"}</td>
                  <td className="px-6 py-4 flex flex-col gap-2 items-start">
                    <ul className="flex flex-col gap-2 items-start">
                      {user?.roles?.map((role: string, roleIndex: number) => (
                        <li
                          className="text-xs text-gray-500 whitespace-nowrap dark:text-gray-400 list-disc"
                          key={roleIndex}
                        >
                          {role || "-"}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">{createdDate}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={status} />
                  </td>

                  <td className="px-6 py-4">
                    <Dropdown
                      options={[
                        {
                          title: "View",
                          onClick: () => {
                            setSelectedUserId(user.id);
                            setIsModalOpen("view");
                          },
                        },
                        {
                          title: "Edit",
                          onClick: () => {
                            setInitialValues(user);
                            setIsModalOpen("edit");
                          },
                        },
                        {
                          title: "Delete",
                          onClick: () => {
                            deactivate(user.id);
                          },
                        },
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

        {users && users.length === 0 && !isLoading && (
          <EmptyState
            icon={FiUserCheck}
            title="No System Users"
            description="Your user directory is currently empty. Add administrators, payroll officers, or managers to grant them access to the platform."
            action={{
              label: "Add User",
              onClick: () => setIsModalOpen("add"),
              icon: <FiPlus />
            }}
          />
        )}
      </div>
      {isModalOpen === "add" && <AddUser />}
      {isModalOpen === "edit" && initialValues && (
        <EditUser
          initialValues={initialValues as unknown as EditUserFormValues}
        />
      )}
      {isModalOpen === "view" && selectedUserId && (
        <ViewUser selectedUserId={selectedUserId} />
      )}
    </div>
  );
};

export default UsersTable;
