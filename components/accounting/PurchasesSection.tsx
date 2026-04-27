import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import BillTab from "./purchases/BillTab";
import SupplierTab from "./purchases/SupplierTab";
import ExpenseTab from "./purchases/ExpenseTab";
import { useGetAccountingSuppliersQuery } from "@/services/api/constants/accounting.constant";

const PurchasesSection = () => {
  const [activeSubTab, setActiveSubTab] = useState<"bills" | "suppliers" | "expenses">("bills");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [supplierId, setSupplierId] = useState("");

  const { data: suppliers } = useGetAccountingSuppliersQuery("");

  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-md dark:bg-gray-800">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-md dark:bg-gray-700">
          <button
            onClick={() => setActiveSubTab("bills")}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${activeSubTab === "bills" ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
          >
            Bills
          </button>
          <button
            onClick={() => setActiveSubTab("expenses")}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${activeSubTab === "expenses" ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveSubTab("suppliers")}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${activeSubTab === "suppliers" ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
          >
            Suppliers
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          {activeSubTab === "bills" && (
            <>
              <select
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className="w-full md:w-auto px-3 py-2 bg-gray-50 border border-gray-100 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
              >
                <option value="">All Suppliers</option>
                {suppliers?.data?.map((s: { id: number; name: string }) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-auto px-3 py-2 bg-gray-50 border border-gray-100 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
              >
                <option value="">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Recieved">Recieved</option>

              </select>
            </>
          )}
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder={`Search ${activeSubTab}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
            />
          </div>
          <button
            onClick={() => {
              if (activeSubTab === "bills") setIsBillModalOpen(true);
              if (activeSubTab === "suppliers") setIsSupplierModalOpen(true);
              if (activeSubTab === "expenses") setIsExpenseModalOpen(true);
            }}
            className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-md hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            <FiPlus className="mr-2" /> New {activeSubTab === "bills" ? "Bill" : activeSubTab === "suppliers" ? "Supplier" : "Expense"}
          </button>
        </div>
      </div>

      <section className="bg-white rounded-md shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto pb-48">
          {activeSubTab === "bills" && (
            <BillTab
              isModalOpen={isBillModalOpen}
              onCloseModal={() => setIsBillModalOpen(false)}
              statusFilter={statusFilter}
              supplierId={supplierId}
            />
          )}
          {activeSubTab === "suppliers" && (
            <SupplierTab
              isModalOpen={isSupplierModalOpen}
              onCloseModal={() => setIsSupplierModalOpen(false)}
              search={search}
            />
          )}
          {activeSubTab === "expenses" && (
            <ExpenseTab
              isModalOpen={isExpenseModalOpen}
              onCloseModal={() => setIsExpenseModalOpen(false)}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default PurchasesSection;
