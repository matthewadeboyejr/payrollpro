"use client";

import { Shifts } from "@/components/types/shifts";
import {
  useGetRotaQuery,
  useGetShiftsQuery,
} from "@/services/api/constants/shift.constant";
import React, { createContext, useContext, useState, useEffect } from "react";

export const ShiftContext = createContext<ShiftContextType | null>(null);

export interface ShiftContextType {
  departmentId: string;
  setDepartmentId: (departmentId: string) => void;
  shifts: Shifts[];
  setShifts: (shifts: Shifts[]) => void;
  shiftsData: Shifts[];
  rota: any[];
  setRota: (rota: any[]) => void;
  rotaData: any[];
  rotaFilters: {
    departmentId: string;
    month: string;
    year: string;
    search: string;
  };
  setRotaFilters: (rotaFilters: {
    departmentId: string;
    month: string;
    year: string;
    search: string;
  }) => void;
  isLoadingShifts: boolean;
  isLoadingRota: boolean;
}

export const ShiftProvider = ({ children }: { children: React.ReactNode }) => {
  const [rotaFilters, setRotaFilters] = useState({
    departmentId: "",
    month: "",
    year: "",
    search: "",
  });

  const [departmentId, setDepartmentId] = useState("");
  const [shifts, setShifts] = useState<Shifts[]>([]);
  const [rota, setRota] = useState<any[]>([]);
  const { data: shiftsResponse, isLoading: isLoadingShifts } = useGetShiftsQuery({ departmentId });
  const { data: rotaResponse, isLoading: isLoadingRota } = useGetRotaQuery(rotaFilters);

  const shiftsData = shiftsResponse?.data;
  const rotaData = rotaResponse?.data;

  console.log("rotaResponse", rotaResponse);

  // Update shifts state when shiftsData changes
  useEffect(() => {
    if (shiftsData) {
      setShifts(shiftsData);
    }
  }, [shiftsData]);

  useEffect(() => {
    if (rotaData) {
      setRota(rotaData);
    }
  }, [rotaData]);
  return (
    <div>
      <ShiftContext.Provider
        value={{
          departmentId,
          setDepartmentId,
          shifts,
          setShifts,
          shiftsData,
          rota,
          setRota,
          rotaData,
          rotaFilters,
          setRotaFilters,
          isLoadingShifts,
          isLoadingRota,
        }}
      >
        {children}
      </ShiftContext.Provider>
    </div>
  );
};

export default ShiftContext;

export const useShift = () => {
  return useContext(ShiftContext);
};
