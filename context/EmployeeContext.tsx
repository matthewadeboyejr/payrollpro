"use client";

import { AddNewEmployeeFormValues } from "@/components/types/formFields";
import React, { createContext, useContext, useState } from "react";

export const EmployeeContext = createContext({});

export const EmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <EmployeeContext.Provider value={{}}>{children}</EmployeeContext.Provider>
    </div>
  );
};

export default EmployeeContext;

export const useEmployee = () => {
  return useContext(EmployeeContext);
};
