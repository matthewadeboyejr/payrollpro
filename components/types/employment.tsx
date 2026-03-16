export interface Employee {
  id: string;
  employeeNo: string;
  fullName: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  status: string;
  Address?: string;
  weeklyHours?: number;
  workingDaysPerWeek?: number;
  employmentTypeName?: string;
  gradeLevelName?: string;
  salaryBandCode?: string;
  customSalary?: number;
}
