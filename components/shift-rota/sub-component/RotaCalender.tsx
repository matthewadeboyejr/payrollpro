"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  format,
  parseISO,
  startOfWeek,
  addDays,
  isSameDay,
  getMonth,
  getYear,
} from "date-fns";
import {
  FiMoreVertical,
  FiEye,
  FiCheck,
  FiEdit,
  FiTrash2,
  FiX,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import ViewRota from "./ViewRota";
import { useModal } from "@/context/ModalContext";
import {
  useClaimRotaMutation,
  useCompleteRotaMutation,
} from "@/services/api/constants/shift.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import { useShift } from "@/context/ShiftContext";
import { useGetDepartmentsQuery } from "@/services/api/constants/data.constant";
import { useAction } from "@/hooks/useAction";
import CancelRota from "./CancelRota";
import EditRota from "./EditRota";

// Type Definitions
interface ApiShift {
  id: number;
  workDate: string;
  employeeId: number;
  employeeName: string;
  shiftId: number;
  shiftName: string;
  shiftStart: string;
  shiftEnd: string;
  isCancelled: boolean;
  cancelledAt: string | null;
  departmentId: number;
  departmentName: string;
  hoursWorked: number;
  completedAt: string | null;
  approvedAt: string | null;
  isOpen: boolean;
}

interface RotaCalendarProps {
  shifts: ApiShift[];
  isFilterOpen?: boolean;
  setIsFilterOpen?: (isOpen: boolean) => void;
}

interface EmployeeRota {
  employeeId: number;
  employeeName: string;
  totalHours: number;
  totalCost: number;
  shiftCount: number;
  shifts: ApiShift[];
}

interface ShiftActionMenuProps {
  shift: ApiShift;
  onView: (shift: ApiShift) => void;
  onComplete: (shift: ApiShift) => void;
  onEdit: (shift: ApiShift) => void;
  onDelete: (shift: ApiShift) => void;
  onCancel: (shift: ApiShift) => void;
  onClaim: (shift: ApiShift) => void;
}

const ShiftActionMenu: React.FC<ShiftActionMenuProps> = ({
  shift,
  onView,
  onComplete,
  onEdit,
  onDelete,
  onCancel,
  onClaim,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors bg-white shadow-sm border border-gray-200"
      >
        <FiMoreVertical className="text-gray-700" size={14} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-9 z-50 bg-white border border-gray-200 rounded-sm shadow-xl min-w-[160px]">
          <button
            type="button"
            onClick={() => {
              onView(shift);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
          >
            <FiEye className="text-gray-600" size={14} />
            View
          </button>
          {!shift.completedAt && (
            <button
              type="button"
              onClick={() => {
                onComplete(shift);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <FiCheck className="text-green-600" size={14} />
              Complete
            </button>
          )}
          {!shift.isCancelled && (
            <>
              <button
                type="button"
                onClick={() => {
                  onEdit(shift);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <FiEdit className="text-blue-600" size={14} />
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  onCancel(shift);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <FiX className="text-orange-600" size={14} />
                Cancel
              </button>
            </>
          )}
          {shift.isOpen && (
            <button
              type="button"
              onClick={() => {
                onClaim(shift);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <FiUser className="text-purple-600" size={14} />
              Claim
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onDelete(shift);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const RotaCalendar: React.FC<RotaCalendarProps> = ({
  shifts,
  isFilterOpen = false,
  setIsFilterOpen,
}) => {
  const shiftContext = useShift();
  const { rotaFilters, setRotaFilters } = shiftContext || {};
  const { data: departmentsResponse } = useGetDepartmentsQuery(undefined);
  const filterRef = useRef<HTMLDivElement>(null);
  const { deleteRotaAction, isDeletingRota } = useAction();
  // Initialize currentWeek based on rotaFilters or current date
  const getInitialWeek = () => {
    if (rotaFilters?.month && rotaFilters?.year) {
      const month = parseInt(rotaFilters.month) - 1; // 0-indexed
      const year = parseInt(rotaFilters.year);
      return new Date(year, month, 1);
    }
    return new Date();
  };

  const [currentWeek, setCurrentWeek] = useState(getInitialWeek());
  const { isModalOpen, setIsModalOpen } = useModal();
  const [selectedRota, setSelectedRota] = useState<any>(null);
  const [localFilters, setLocalFilters] = useState({
    departmentId: rotaFilters?.departmentId || "",
    month: rotaFilters?.month || "",
    year: rotaFilters?.year || "",
  });

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Sync local filters with context filters
  useEffect(() => {
    if (rotaFilters) {
      setLocalFilters({
        departmentId: rotaFilters.departmentId || "",
        month: rotaFilters.month || "",
        year: rotaFilters.year || "",
      });
    }
  }, [rotaFilters]);

  // Update month/year filters when week changes
  useEffect(() => {
    if (setRotaFilters && rotaFilters) {
      const month = (getMonth(currentWeek) + 1).toString();
      const year = getYear(currentWeek).toString();

      // Only update if different from current filters
      if (rotaFilters.month !== month || rotaFilters.year !== year) {
        setRotaFilters({
          ...rotaFilters,
          month,
          year,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeek]);

  // Handle click outside filter panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        isFilterOpen
      ) {
        setIsFilterOpen?.(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen, setIsFilterOpen]);

  const [completeRota, { isLoading: isLoadingCompleteRota }] =
    useCompleteRotaMutation();
  const [claimRota, { isLoading: isLoadingClaimRota }] = useClaimRotaMutation();
  // Group rota by employee
  const employeeRotas = useMemo(() => {
    const grouped = new Map<number, EmployeeRota>();

    shifts.forEach((shift) => {
      if (!grouped.has(shift.employeeId)) {
        grouped.set(shift.employeeId, {
          employeeId: shift.employeeId,
        employeeName: shift.employeeName,
          totalHours: 0,
          totalCost: 0,
          shiftCount: 0,
          shifts: [],
        });
      }

      const employeeRota = grouped.get(shift.employeeId)!;
      employeeRota.shifts.push(shift);
      employeeRota.totalHours += shift.hoursWorked;
      employeeRota.shiftCount += 1;
      // Assuming rate calculation - adjust based on your data
      employeeRota.totalCost += shift.hoursWorked * 10; // Placeholder rate
    });

    return Array.from(grouped.values());
  }, [shifts]);

  // Group by department
  const departmentGroups = useMemo(() => {
    const groups = new Map<string, EmployeeRota[]>();

    employeeRotas.forEach((employeeRota) => {
      const firstShift = employeeRota.shifts[0];
      const deptName = firstShift?.departmentName || "Other";

      if (!groups.has(deptName)) {
        groups.set(deptName, []);
      }

      groups.get(deptName)!.push(employeeRota);
    });

    return Array.from(groups.entries());
  }, [employeeRotas]);

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  const getShiftForDay = (employeeRota: EmployeeRota, day: Date) => {
    return employeeRota.shifts.find((shift) => {
      const shiftDate = parseISO(shift.workDate);
      return isSameDay(shiftDate, day);
    });
  };

  const getShiftBorderColor = (shift: ApiShift) => {
    if (shift.isCancelled) return "border-red-300 bg-red-50";
    if (shift.isOpen) return "border-blue-300 bg-blue-50";
    if (shift.completedAt) return "border-green-300 bg-green-50";
    return "border-blue-200 bg-white";
  };

  const handleView = (shift: ApiShift) => {
    console.log("View:", shift);
    setSelectedRota(shift);
    setIsModalOpen("view-rota");
  };

  const handleComplete = async (shift: ApiShift) => {
    console.log("Complete:", shift);

    const payload = {
      rotaId: shift.id,
    };
    console.log("payload", payload);
    try {
      const response = await completeRota(payload).unwrap();
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "Success");
      }
    } catch (err: unknown) {
      console.log("error", err);
      /* const error = err as {
        data?: { code?: number; title?: string; message?: string | string[] };
      };
      const errorMessage = error?.data?.title || error?.data?.message || "Failed to complete rota";
      showAlert("Error", errorMessage, "error"); */
    }
  };

  const handleEdit = (shift: ApiShift) => {
    console.log("Edit:", shift);
    setIsModalOpen("edit-rota");
    setSelectedRota(shift);
  };

  const handleDelete = (shift: ApiShift) => {
    console.log("Delete:", shift);
    deleteRotaAction(shift.id.toString());
  };

  const handleCancel = (shift: ApiShift) => {
    setIsModalOpen("cancel-rota");
    setSelectedRota(shift);
  };

  const handleClaim = async (shift: ApiShift) => {
    console.log("Claim:", shift);
    const payload = {
      rotaId: shift.id,
    };
    console.log("payload", payload);
    try {
      const response = await claimRota(payload).unwrap();
      if (response?.code === 201 || response?.code === 200) {
        showAlert("Success", response?.message, "Success");
      }
    } catch (err: unknown) {
      console.log("error", err);
    }
  };

  // Calculate week summary
  const weekSummary = useMemo(() => {
    const totalHours = shifts.reduce((sum, item) => sum + item.hoursWorked, 0);
    const totalCost = totalHours * 10; // Placeholder rate
    return { totalHours, totalCost };
  }, [shifts]);

  // Calculate daily summaries
  const dailySummaries = useMemo(() => {
    return weekDays.map((day) => {
      const dayShifts = shifts.filter((item) => {
        const shiftDate = parseISO(item.workDate);
        return isSameDay(shiftDate, day);
      });
      const hours = dayShifts.reduce((sum, item) => sum + item.hoursWorked, 0);
      const cost = hours * 10; // Placeholder rate
      return { day, hours, cost, shiftCount: dayShifts.length };
    });
  }, [shifts, weekDays]);

  const handlePreviousWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  // Filter options
  const departmentOptions =
    departmentsResponse?.data?.map((dept: any) => ({
      value: dept.id.toString(),
      label: dept.name,
    })) || [];

  const monthOptions = [
    { value: "", label: "All Months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: (currentYear - 2 + i).toString(),
    label: (currentYear - 2 + i).toString(),
  }));

  const handleFilterChange = (field: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    if (setRotaFilters && rotaFilters) {
      const updatedFilters = {
        ...rotaFilters,
        ...localFilters,
      };
      setRotaFilters(updatedFilters);

      // Update currentWeek if month/year changed
      if (localFilters.month && localFilters.year) {
        const month = parseInt(localFilters.month) - 1;
        const year = parseInt(localFilters.year);
        setCurrentWeek(new Date(year, month, 1));
      }
    }
    setIsFilterOpen?.(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      departmentId: "",
      month: "",
      year: "",
      search: rotaFilters?.search || "",
    };
    setLocalFilters({
      departmentId: "",
      month: "",
      year: "",
    });
    if (setRotaFilters) {
      setRotaFilters(clearedFilters);
    }
    setCurrentWeek(new Date());
  };

  return (
    <>
      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4">
          <div
            ref={filterRef}
            className="bg-white border border-gray-200 rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Filter Rota
              </h3>
              <button
                onClick={() => setIsFilterOpen?.(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <FiX className="text-gray-600" size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={localFilters.departmentId}
                  onChange={(e) =>
                    handleFilterChange("departmentId", e.target.value)
                  }
                  className="w-full border border-gray-200 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departmentOptions.map(
                    (option: { value: string; label: string }) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Month Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month
                </label>
                <select
                  value={localFilters.month}
                  onChange={(e) => handleFilterChange("month", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {monthOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  value={localFilters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Years</option>
                  {yearOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-5">
        {/* Week Summary Header */}
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-shrink-0">
              <h3 className="font-semibold text-gray-900 text-sm">
                Week {format(weekStart, "w")} summary
              </h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-600">
                  H {Math.floor(weekSummary.totalHours)}h{" "}
                  {Math.round((weekSummary.totalHours % 1) * 60)}m
                </span>
                <span className="text-sm text-gray-600">
                  C £{weekSummary.totalCost.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-1 overflow-x-auto">
              {dailySummaries.map((summary, index) => (
                <div
                  key={index}
                  className="text-center px-3 py-2 bg-white rounded border border-gray-200 flex-shrink-0 min-w-[100px]"
                >
                  <div className="text-xs font-medium text-gray-700">
                    {format(summary.day, "d")} {format(summary.day, "EEE")}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {Math.floor(summary.hours)}h{" "}
                    {Math.round((summary.hours % 1) * 60)}m
                  </div>
                  <div className="text-xs text-gray-600">
                    £{summary.cost.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousWeek}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
            >
              <FiChevronLeft />
            </button>
            <div className="text-sm font-medium text-gray-700">
              {format(weekDays[0], "MMM d")} -{" "}
              {format(weekDays[6], "MMM d, yyyy")}
            </div>
            <button
              onClick={handleNextWeek}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Rota Table Grid */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-700 border-r border-gray-200 min-w-[220px]">
                  Staff
                </th>
                {weekDays.map((day, index) => (
                  <th
                    key={index}
                    className="px-3 py-3 text-center text-xs font-medium text-gray-700 min-w-[140px] border-l border-gray-200"
                  >
                    <div className="font-semibold">{format(day, "d")}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">
                      {format(day, "EEE")}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {departmentGroups.map(([departmentName, employees]) => (
                <React.Fragment key={departmentName}>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <td
                      colSpan={8}
                      className="px-4 py-2 text-sm font-semibold text-gray-700 sticky left-0 z-10 bg-gray-100"
                    >
                      {departmentName}
                    </td>
                  </tr>
                  {employees.map((employeeRota) => (
                    <tr
                      key={employeeRota.employeeId}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="sticky left-0 z-10 bg-white px-4 py-3 border-r border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                            <FiUser className="text-gray-600" size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900 truncate">
                              {employeeRota.employeeName}
                            </div>
                            <div className="text-xs text-gray-600">
                              {Math.floor(employeeRota.totalHours)}h{" "}
                              {Math.round((employeeRota.totalHours % 1) * 60)}m
                            </div>
                            <div className="text-xs text-gray-600">
                              £{employeeRota.totalCost.toFixed(2)} •{" "}
                              {employeeRota.shiftCount} shifts
                            </div>
                          </div>
                        </div>
                      </td>
                      {weekDays.map((day, dayIndex) => {
                        const shift = getShiftForDay(employeeRota, day);
                        return (
                          <td
                            key={dayIndex}
                            className="px-2 py-2 align-top border-l border-gray-100"
                          >
                            {shift ? (
                              <div
                                className={`${getShiftBorderColor(
                                  shift
                                )} border-2 rounded p-2 relative min-h-[70px] cursor-pointer hover:shadow-md transition-all`}
                                onClick={(e) => {
                                  if (
                                    (e.target as HTMLElement).closest(
                                      ".action-menu"
                                    )
                                  ) {
                                    return;
                                  }
                                  handleView(shift);
                                }}
                              >
                                <div className="pr-7">
                                  <div className="text-xs font-semibold text-gray-900">
                                    {formatTime(shift.shiftStart)} -{" "}
                                    {formatTime(shift.shiftEnd)}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">
                                    {shift.shiftName}
                                  </div>
                                  {shift.isOpen && (
                                    <div className="text-[10px] text-blue-600 mt-1 font-medium">
                                      Open
                                    </div>
                                  )}
                                  {shift.isCancelled && (
                                    <div className="text-[10px] text-red-600 mt-1 font-medium">
                                      Cancelled
                                    </div>
                                  )}
                                  {shift.completedAt && (
                                    <div className="text-[10px] text-green-600 mt-1 font-medium">
                                      Completed
                                    </div>
                                  )}
                                </div>
                                <div
                                  className="absolute top-1 right-1 action-menu z-10"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ShiftActionMenu
                                    shift={shift}
                                    onView={handleView}
                                    onComplete={handleComplete}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onCancel={handleCancel}
                                    onClaim={handleClaim}
        />
      </div>
    </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-200 rounded min-h-[70px] flex items-center justify-center bg-gray-50">
                                <span className="text-gray-400 text-xs">—</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen === "view-rota" && <ViewRota selectedRota={selectedRota} />}
      {isModalOpen === "cancel-rota" && (
        <CancelRota rotaId={selectedRota?.id.toString()} />
      )}
      {isModalOpen === "edit-rota" && <EditRota rotaId={selectedRota?.id.toString()} />}
    </>
  );
};

export default RotaCalendar;
