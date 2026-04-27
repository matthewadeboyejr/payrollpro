import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import InvoiceTab from "./sales/InvoiceTab";
import CustomerTab from "./sales/CustomerTab";
import { useGetAccountingCustomersQuery } from "@/services/api/constants/accounting.constant";

const SalesSection = () => {
  const [activeSubTab, setActiveSubTab] = useState<"invoices" | "customers">("invoices");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [customersId, setCustomersId] = useState("");
  const { data: customers } = useGetAccountingCustomersQuery("");
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-md dark:bg-gray-800">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-md dark:bg-gray-700">
          <button
            onClick={() => setActiveSubTab("invoices")}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${activeSubTab === "invoices" ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveSubTab("customers")}
            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${activeSubTab === "customers" ? "bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
          >
            Customers
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          {activeSubTab === "invoices" && (
            <>
              <select
                value={customersId}
                onChange={(e) => setCustomersId(e.target.value)}
                className="w-full md:w-auto px-3 py-2 bg-gray-50 border border-gray-100 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
              >
                <option value={""}>All Customers</option>
                {customers?.data?.map((c: { id: string; name: string }) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-auto px-3 py-2 bg-gray-50 border border-gray-100 rounded-md text-xs focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
              >
                <option value="">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Overdue">Overdue</option>
                <option value="Draft">Draft</option>
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
              if (activeSubTab === "invoices") setIsInvoiceModalOpen(true);
              if (activeSubTab === "customers") setIsCustomerModalOpen(true);
            }}
            className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-md hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            <FiPlus className="mr-2" /> New {activeSubTab === "invoices" ? "Invoice" : "Customer"}
          </button>
        </div>
      </div>

      <section className="bg-white rounded-md shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto pb-48">
          {activeSubTab === "invoices" && (
            <InvoiceTab
              isModalOpen={isInvoiceModalOpen}
              onCloseModal={() => setIsInvoiceModalOpen(false)}
              statusFilter={statusFilter}
              customersId={customersId}
            />
          )}
          {activeSubTab === "customers" && (
            <CustomerTab
              isModalOpen={isCustomerModalOpen}
              onCloseModal={() => setIsCustomerModalOpen(false)}
              search={search}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default SalesSection;
