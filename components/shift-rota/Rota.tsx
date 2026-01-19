import React, { useState, useEffect, useMemo } from "react";
import { BiExport } from "react-icons/bi";
import { FiFilter, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { useModal } from "@/context/ModalContext";
import AddRota from "./sub-component/AddRota";
import { useShift } from "@/context/ShiftContext";
import RotaCalendar from "./sub-component/RotaCalender";
import OpenShiftsTable from "./sub-component/OpenShiftsTable";
import { useDebounce } from "@/hooks/useDebounce";

const Rota = () => {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "open">("all");
  const { isModalOpen, setIsModalOpen } = useModal();
  const shiftContext = useShift();
  const rota = shiftContext?.rota || [];
  const { rotaFilters, setRotaFilters } = shiftContext || {};

  // Debounce search input
  const debouncedSearch = useDebounce(search, 400);

  // Update rotaFilters when debounced search changes
  useEffect(() => {
    if (setRotaFilters && rotaFilters) {
      setRotaFilters({
        ...rotaFilters,
        search: debouncedSearch,
      });
    }
  }, [debouncedSearch, setRotaFilters]);

  // Initialize search from rotaFilters
  useEffect(() => {
    if (rotaFilters?.search) {
      setSearch(rotaFilters.search);
    }
  }, []);

  // Check if any filters are active
  const hasActiveFilters =
    rotaFilters?.departmentId ||
    rotaFilters?.month ||
    rotaFilters?.year ||
    rotaFilters?.search;

  // Filter rota based on active tab
  const filteredRota = useMemo(() => {
    if (activeTab === "open") {
      return rota.filter((shift: any) => shift.isOpen === true);
    }
    return rota;
  }, [rota, activeTab]);

  return (
    <>
      {/* Tabs - Underline Style */}
      <section className="w-full mt-5 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`relative px-1 py-3 font-medium text-sm transition-all duration-200 ${
              activeTab === "all"
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All Rota
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("open")}
            className={`relative px-1 py-3 font-medium text-sm transition-all duration-200 ${
              activeTab === "open"
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Open Shifts
            {activeTab === "open" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t"></span>
            )}
          </button>
        </div>
      </section>

      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-5">
        <div className="flex flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto bg-gray-50">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search employee name..."
            className="outline-none focus:outline-none focus:ring-focus focus:ring-focus text-sm w-full bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                if (setRotaFilters && rotaFilters) {
                  setRotaFilters({
                    ...rotaFilters,
                    search: "",
                  });
                }
              }}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <FiX className="text-gray-500" size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            className="primary-btn flex items-center gap-2 w-full md:w-auto"
            onClick={() => setIsModalOpen("add-rota")}
          >
            <FiPlus />
            <span>Add Rota</span>
          </button>
          {activeTab === "all" && (
            <button
              className={`secondary-btn flex items-center gap-2 w-full md:w-auto ${
                hasActiveFilters ? "bg-blue-50 border-blue-300" : ""
              }`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FiFilter className="text-blue-500" />
              <span>Filter</span>
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {
                    [
                      rotaFilters?.departmentId,
                      rotaFilters?.month,
                      rotaFilters?.year,
                    ].filter(Boolean).length
                  }
                </span>
              )}
            </button>
          )}
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

      {/* Conditional rendering based on active tab */}
      {activeTab === "all" ? (
        <RotaCalendar
          shifts={filteredRota}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      ) : (
        <OpenShiftsTable shifts={filteredRota} />
      )}

      {/* Add Rota Modal */}
      {isModalOpen === "add-rota" && <AddRota />}
    </>
  );
};

export default Rota;
