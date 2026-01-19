import React from "react";

export interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  value?: string | number;
  data?: string | number;
  color?: string;
  details?: string;
}

export interface getLeave {
  id: number;
  requestNo: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
  reason: string;
  comment: string;
  approvedBy: string;
  dayRequested: number;
  hoursRequested: number;
  remainingBalance: number;
  createdAt: string;
}
