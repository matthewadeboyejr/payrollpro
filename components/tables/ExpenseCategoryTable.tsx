import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch, FiList } from "react-icons/fi";
import UsersTableSkeleton from "../ui/UsersTableSkeleton";
import EmptyState from "../ui/EmptyState";
import { useModal } from "@/context/ModalContext";
import {
    useGetExpenseCategoriesQuery,
} from "@/services/api/constants/expense.constant";
import AddExpenseCategory from "../settings/sub-component/AddExpenseCategory";
import EditExpenseCategory from "../settings/sub-component/EditExpenseCategory";

import { ExpenseCategory, EditExpenseCategoryFormValues } from "@/components/types/formFields";
import { useAction } from "@/hooks/useAction";
import { showAlert } from "../ui/ShowAlert";

const ExpenseCategoryTable = () => {
    const { deleteExpenseCategoriesAction } = useAction()
    const { isModalOpen, setIsModalOpen } = useModal();
    const [search, setSearch] = useState("");
    const [initialValues, setInitialValues] = useState<EditExpenseCategoryFormValues | null>(null);

    const { data: expenseCategories, isLoading } = useGetExpenseCategoriesQuery(undefined);
    const expenseCategoriesData = Array.isArray(expenseCategories) ? expenseCategories : (expenseCategories?.data || []);

    const filteredCategories = expenseCategoriesData.filter((category: ExpenseCategory) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        try {
            await deleteExpenseCategoriesAction(id);
            showAlert("success", "Expense category deleted successfully", "success");
        } catch {
            showAlert("error", "Failed to delete expense category", "error");
        }
    };

    if (isLoading) {
        return <UsersTableSkeleton />;
    }

    return (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-sm dark:bg-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <FiSearch className="text-gray-500 dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="w-full outline-none focus:outline-none focus:ring-focus focus:ring-focus text-sm bg-transparent dark:text-white dark:placeholder-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        className="primary-btn flex items-center gap-2 w-full md:w-auto"
                        onClick={() => {
                            setIsModalOpen("add-expenseCategory");
                        }}
                    >
                        <FiPlus />
                        <span>Add Category</span>
                    </button>
                </div>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-nowrap text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Monthly Limit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category: ExpenseCategory, index: number) => (
                            <tr
                                className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                key={category.id}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">{category.name}</td>
                                <td className="px-6 py-4">
                                    {category.monthlyLimit}
                                </td>
                                <td className="px-6 py-4 relative">
                                    <Dropdown
                                        options={[
                                            {
                                                title: "Edit",
                                                onClick: () => {
                                                    setInitialValues(category);
                                                    setIsModalOpen("edit-expenseCategory");
                                                },
                                            },
                                            {
                                                title: "Delete",
                                                onClick: () => handleDelete(category.id),
                                            },
                                        ]}
                                        label="Actions"
                                        size="sm"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredCategories.length === 0 && !isLoading && (
                    <EmptyState
                        icon={FiList}
                        title="No Categories"
                        description="Expense categories are not defined yet. Add categories like 'Travel', 'Meals', or 'Office Supplies' to help employees classify their expense claims."
                        action={{
                            label: "Add Category",
                            onClick: () => setIsModalOpen("add-expenseCategory"),
                            icon: <FiPlus />
                        }}
                    />
                )}
            </div>
            {isModalOpen === "add-expenseCategory" && <AddExpenseCategory />}
            {isModalOpen === "edit-expenseCategory" && initialValues && (
                <EditExpenseCategory initialValues={initialValues} />
            )}
        </div>
    );
};

export default ExpenseCategoryTable;
