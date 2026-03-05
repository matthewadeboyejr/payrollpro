
import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch } from "react-icons/fi";
import { BiExport } from "react-icons/bi";
import {
    useGetIncomeQuery,

    useDeleteIncomeMutation,
} from "@/services/api/constants/expense.constant";
import AddIncome from "@/components/incomeManagement/sub-component/AddIncome";
import EditIncome from "@/components/incomeManagement/sub-component/EditIncome";

import ReviewIncome from "@/components/incomeManagement/sub-component/ReviewIncome";
import ViewIncome from "@/components/incomeManagement/sub-component/ViewIncome";
import { useModal } from "@/context/ModalContext";
import IncomeSummaryCards from "@/components/incomeManagement/IncomeSummaryCards";

interface IncomeFilters {
    page: number;
    limit: number;
    search: string;
    status: string;
    startDate: string;
    endDate: string;
}

const IncomeManagementTable = () => {
    const { isModalOpen, setIsModalOpen } = useModal();
    const [incomeFilters] = useState<IncomeFilters>({
        page: 1,
        limit: 10,
        search: "",
        status: "",
        startDate: "",
        endDate: "",
    });
    const [search, setSearch] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedIncome, setSelectedIncome] = useState<any>(null);

    const { data: incomeData, isLoading } = useGetIncomeQuery({
        employeeId: "",
        fromDate: incomeFilters.startDate,
        toDate: incomeFilters.endDate,
        categoryId: "",
        page: incomeFilters.page,
        pageSize: incomeFilters.limit,
        search: search
    });
    const [deleteIncome] = useDeleteIncomeMutation();

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this income record?")) {
            try {
                await deleteIncome(id).unwrap();
            } catch (error) {
                console.error("Failed to delete income:", error);
            }
        }
    };

    return (
        <div className="space-y-5">
            <IncomeSummaryCards />
            <div className="flex flex-col gap-4 bg-white p-4 rounded-sm dark:bg-gray-800">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold dark:text-white">Income Records</h2>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <FiSearch className="text-gray-500 dark:text-gray-400" />
                        <input
                            type="text"
                            placeholder="search income source"
                            className="outline-none focus:outline-none focus:ring-focus focus:ring-focus text-sm w-full bg-transparent dark:text-white dark:placeholder-gray-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <button
                            className="primary-btn flex items-center gap-2 w-full md:w-auto"
                            onClick={() => {
                                setSelectedIncome(null);
                                setIsModalOpen("add");
                            }}
                        >
                            <FiPlus />
                            <span>Add Income</span>
                        </button>

                        <button
                            className="secondary-btn flex items-center gap-2 w-full md:w-auto"
                            onClick={() => {
                                console.log("export");
                            }}
                        >
                            <span>
                                <BiExport className="text-blue-500" />
                            </span>
                            <span>Export</span>
                        </button>
                    </div>
                </div>
                <div className="relative overflow-visible">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Employee</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Taxable</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={7} className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : incomeData?.data?.items?.length > 0 ? (
                                incomeData.data.items
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    .filter((item: any) =>
                                        item.categoryName?.toLowerCase().includes(search.toLowerCase()) ||
                                        item.description?.toLowerCase().includes(search.toLowerCase()) ||
                                        item.employeeName?.toLowerCase().includes(search.toLowerCase())
                                    )
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    .map((income: any) => (
                                        <tr key={income.id} className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {income.employeeName}
                                            </td>
                                            <td className="px-6 py-4">{income.categoryName}</td>
                                            <td className="px-6 py-4">{income.description}</td>
                                            <td className="px-6 py-4">£{income.amount}</td>
                                            <td className="px-6 py-4">{new Date(income.incomeDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${income.isTaxable ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                                    {income.isTaxable ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 relative">
                                                <Dropdown
                                                    options={[
                                                        {
                                                            title: "View", onClick: () => {
                                                                setSelectedIncome(income);
                                                                setIsModalOpen("view");
                                                            }
                                                        },
                                                        /*  {
                                                             title: "Review", onClick: () => {
                                                                 setSelectedIncome(income);
                                                                 setIsModalOpen("review");
                                                             }
                                                         }, */
                                                        {
                                                            title: "Edit", onClick: () => {
                                                                setSelectedIncome(income);
                                                                setIsModalOpen("edit");
                                                            }
                                                        },
                                                        { title: "Delete", onClick: () => handleDelete(income.id) },
                                                    ]}
                                                    label="Actions"
                                                    size="sm"
                                                />
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr><td colSpan={7} className="px-6 py-4 text-center">No income records found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {isModalOpen === "add" && <AddIncome />}
                {isModalOpen === "edit" && selectedIncome && <EditIncome initialValues={selectedIncome} />}
                {isModalOpen === "review" && selectedIncome && <ReviewIncome data={selectedIncome} />}
                {isModalOpen === "view" && selectedIncome && <ViewIncome data={selectedIncome} />}
            </div>
        </div>
    );
};

export default IncomeManagementTable;

