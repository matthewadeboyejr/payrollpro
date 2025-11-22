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
  days: number;
  remainingBalance: number;
  createdAt: string;
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
  days: 1;
  remainingBalance: number;
  createdAt: string;
  approvedDate: string;
}
