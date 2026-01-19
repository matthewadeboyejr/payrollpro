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
export interface getLeaveCalendar {
  id: number;
  title: string;
  employeeId: number;
  leaveTypeId: number;
  start: string;
  end: string;
  status?: string;
  color: string;
  requestNo: string;
}
export interface LeaveDetails {
  id: number;
  requestNo: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
  reason: string;
  comment: string | null;
  approvedBy: string | null;
  dayRequested: number;
  hoursRequested: number;
  remainingBalance: number;
  createdAt: string;
  approvedDate: string;
}
