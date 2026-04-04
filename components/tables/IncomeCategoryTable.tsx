
import React, { useState } from "react";
import { Dropdown } from "../ui/Dropdown";
import { FiPlus, FiSearch, FiList } from "react-icons/fi";
import UsersTableSkeleton from "../ui/UsersTableSkeleton";
import EmptyState from "../ui/EmptyState";
import { useModal } from "@/context/ModalContext";
import { useAction } from "@/hooks/useAction";
import {
    useGetIncomeCategoriesQuery,
    useDeleteIncomeCategoriesMutation,
} from "@/services/api/constants/expense.constant";
import AddIncomeCategory from "../settings/sub-component/AddIncomeCategory";
import EditIncomeCategory from "../settings/sub-component/EditIncomeCategory";
import Spinner from "../ui/Spinner";
import { IncomeCategory, EditIncomeCategoryFormValues } from "@/components/types/formFields";

const IncomeCategoryTable = () => {
    const { deleteIncomeCategoriesAction } = useAction();
    const { isModalOpen, setIsModalOpen } = useModal();
    const [search, setSearch] = useState("");
    const [initialValues, setInitialValues] = useState<EditIncomeCategoryFormValues | null>(null);
    const [, { isLoading: isDeleting }] = useDeleteIncomeCategoriesMutation();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data: incomeCategories, isLoading } = useGetIncomeCategoriesQuery(undefined);
    const incomeCategoriesData = Array.isArray(incomeCategories) ? incomeCategories : (incomeCategories?.data || []);

    const filteredCategories = incomeCategoriesData.filter((category: IncomeCategory) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await deleteIncomeCategoriesAction(id);
        } catch {
        } finally {
            setDeletingId(null);
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
                            setIsModalOpen("add-incomeCategory");
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
                                Is Taxable
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category: IncomeCategory, index: number) => (
                            <tr
                                className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                key={category.id}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">{category.name}</td>
                                <td className="px-6 py-4">
                                    {category.isTaxable ? (
                                        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                            Yes
                                        </span>
                                    ) : (
                                        <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                            No
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 relative">
                                    {isDeleting && deletingId === category.id ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner />
                                        </div>
                                    ) : (
                                        <Dropdown
                                            options={[
                                                {
                                                    title: "Edit",
                                                    onClick: () => {
                                                        setInitialValues(category);
                                                        setIsModalOpen("edit-incomeCategory");
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
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredCategories.length === 0 && !isLoading && (
                    <EmptyState
                        icon={FiList}
                        title="No Categories"
                        description="Additional income categories are not defined yet. Add categories like 'Bonus', 'Commission', or 'Overtime' to help classify non-salary payments."
                        action={{
                            label: "Add Category",
                            onClick: () => setIsModalOpen("add-incomeCategory"),
                            icon: <FiPlus />
                        }}
                    />
                )}
            </div>
            {isModalOpen === "add-incomeCategory" && <AddIncomeCategory />}
            {isModalOpen === "edit-incomeCategory" && initialValues && (
                <EditIncomeCategory initialValues={initialValues} />
            )}
        </div>
    );
};

export default IncomeCategoryTable;
