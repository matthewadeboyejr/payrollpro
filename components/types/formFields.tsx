import { FormApi } from "final-form";
import { FormRenderProps } from "react-final-form";
import { ReactNode } from "react";

export interface FormState {
  submitFailed: boolean | undefined;
  errors: Record<string, string>;
}

export interface TextInputProps {
  label: ReactNode;
  name: string;
  type?: string;
  placeholder?: string;
  form: unknown;
  classes?: string;
  readonly?: boolean;
  desc?: string;
}

export interface TextareaInputProps {
  label: ReactNode;
  name: string;
  placeholder?: string;
  form: unknown;
  desc?: string;
}
export interface SelectInputProps {
  label: ReactNode;
  name: string;
  form: unknown;
  options: { value: string; label: string }[];
  desc?: string;
  readonly?: boolean;
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface SearchableSelectInputProps extends SelectInputProps {
  onSearch?: (searchTerm: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

// React Final Form specific types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FinalFormProps<T = any> {
  form: FormApi<T>;
  handleSubmit: FormRenderProps["handleSubmit"];
  submitting: FormRenderProps["submitting"];
}

// Signin Form specific types
export interface SigninFormValues {
  email: string;
  password: string;
  check?: boolean;
}

export type SigninFormProps = FinalFormProps;

// Signup Form specific types
export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  confirmPassword: string;
  check?: boolean;
}

export type SignupFormProps = FinalFormProps;

// Add New Employee Form specific types

export interface AddNewEmployeeFormValues {
  firstName: "string";
  lastName: "string";
  dateOfBirth: "string";
  gender: "string";
  email: "string";
  phone: "string";
  address: "string";
  emergencyContactName: "string";
  emergencyContactPhone: "string";
  startDate: string;
  departmentId: number;
  positionId: number;
  ratePerHour: number;
  annualSalary: number;
  weeklyHours: number;
  workingDaysPerWeek: number;
  gradeLevelId: number;
  salaryBandId: number;
  employmentTypeId: number;
  customSalary: number;
  workScheduleTypeId: number;
}

export interface EditEmployeeFormValues {
  fullName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  startDate: string;
  departmentId: number;
  positionId: number;
  ratePerHour?: number;
  annualSalary?: number;
  status: string;
  weeklyHours?: number;
  workingDaysPerWeek?: number;
  gradeLevelId?: number;
  salaryBandId?: number;
  employmentTypeId?: number;
  customSalary?: number;
  workScheduleTypeId?: number;
}
export interface EditLeaveTypeValues {
  fullName: string;
  reason: string;
  startDate: string;
  endDate: string;
  employeeNo: string;
}

export interface EmployeePensionFormValues {
  pensionScheme: string;
  contributionPercent: number; // Changed from percentage string to number
  contributionMethod: string;
  optedOut: boolean;
  optOutReason?: string;
  pensionReference?: string;
  isAutoEnrolled: boolean;
  isEligibleForAutoEnrolment: boolean;
}

export type AddNewEmployeeFormProps = FinalFormProps;

export interface AddNewUserFormValues {
  userId?: string;
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export interface EditUserFormValues {
  id?: string;
  userId?: string;
  roles?: string[]; // Optional - from API response
  roleIds: string[];
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string[];
}
export interface EditSalaryBandFormValues {
  id?: string;
  code: string;
  gradeLevelId: string;
  step: number;
  description: string;
  payType: string;
  currency: string;
  minSalary: number;
  midPoint: number;
  maxSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  otherAllowance: number;
}

export interface AddNewSalaryBandFormValues {
  code: string;
  gradeLevelId: string;
  step: number;
  description: string;
  payType: string;
  currency: string;
  minSalary: number;
  midPoint: number;
  maxSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  otherAllowance: number;
}

export type AddNewUserFormProps = FinalFormProps;

export type AddNewSalaryBandFormProps = FinalFormProps;

export interface EditUserFormProps extends FinalFormProps {
  initialValues?: Partial<EditUserFormValues> | null;
}

export interface EditSalaryBandFormProps extends FinalFormProps {
  initialValues?: Partial<EditSalaryBandFormValues> | null;
}
export interface EditEmployeeFormProps extends FinalFormProps {
  initialValues?: Partial<EditEmployeeFormValues> | null;
}

export interface AddNewExpenseFormValues {
  employeeId: string;
  categoryId: string;
  description: string;
  currency: string;
  amount: string;
  status: string;
  receipt: string;
}


export interface AddNewIncomeFormValues {
  employeeId: string;
  categoryId: string;
  amount: string;
  description: string;
  incomeDate: string;
}

export interface AddNewExpenseFormProps extends FinalFormProps {
  id?: string;
}
export interface NewLeaveFormValues {
  employeeId: string;
  employeeNo: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  isHalfDay?: string | boolean;
  timeDesignation?: "AM" | "PM";
  employeeName?: string;
  /* status: string;
  submittedDate: string;
  approvedBy: string;
  approvedDate: string;
  duration: string; */
}

export type NewLeaveFormProps = FinalFormProps;
export interface ReviewExpenseFormValues {
  comment: string;
  status: string;
}

export type ReviewExpenseFormProps = FinalFormProps;

export interface ReviewLeaveFormValues {
  comment: string;
}

export type ReviewLeaveFormProps = FinalFormProps;

export type FormProps = FinalFormProps & {
  id?: string;
};

// Generic form validation types
export interface FormValidationResult {
  [key: string]: string[];
}

export interface FormConstraints {
  [key: string]: Record<string, unknown>;
}

export interface ExpenseDetailsProps {
  title: string;
  employee: string;
  category: string;
  amount: string;
  date: string;
  employeeId: string;
  receipt: string;
}

export interface HMRCSubmissionFormValues {
  submissionType: string;
  taxPeriod: string;
  includeEPS: boolean;
  includeFPS: boolean;
  includeP45P46: boolean;
}

export type HMRCSubmissionFormProps = FinalFormProps;

export interface LeaveDetailsProps {
  employee: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  employeeId: string;
  reason: string;
  status: string;
  submittedDate: string;
  approvedBy: string;
  approvedDate: string;
  duration: string;
}

export interface SettingFormValues {
  companyName: string;
  companyEmail: string;
  timezone?: string;
  currency?: string;
  dateFormat?: string;
  language?: string;
  sessionTimeout?: string;
  passwordPolicy?: string;
  backupFrequency?: string;
  dataRetention?: string;
  twoFactorAuth?: boolean;
  loginNotifications?: boolean;
  autoLogout?: boolean;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  weeklyReports?: boolean;
  systemAlerts?: boolean;
  darkMode?: boolean;
  automaticBackup?: boolean;
  debugMode?: boolean;
}

export type SettingFormProps = {
  form: unknown;
};

export type RegionalSettingsFormProps = FinalFormProps;

// Set Password Form specific types
export interface SetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export type SetPasswordFormProps = FinalFormProps;

// Forget Password Form specific types
export interface ForgetPasswordFormValues {
  email: string;
}

export type ForgetPasswordFormProps = FinalFormProps;

export interface NewShiftFormValues {
  name: string;
  departmentId: number;
  ratePerHour: number;
  startTime: string;
  endTime: string;
  isOvernight: boolean;
  description: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface NewRotaFormValues {
  workDate: string;
  employeeId: string;
  shiftId: string;
}

export interface ClaimRotaFormValues {
  employeeId: string;
}

export interface IncomeCategory {
  id: string;
  name: string;
  isTaxable: boolean;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  monthlyLimit: number;
}

export interface AddIncomeCategoryFormValues {
  name: string;
  isTaxable: boolean;
}

export interface EditIncomeCategoryFormValues {
  id: string;
  name: string;
  isTaxable: boolean;
}

export interface AddExpenseCategoryFormValues {
  name: string;
  monthlyLimit: number;
}

export interface EditExpenseCategoryFormValues {
  id: string;
  name: string;
  monthlyLimit: number;
}

export interface RunPayrollFormValues {
  year: number;
  month: number;
  useTaxPeriods: boolean;
  taxYearStartYear: number;
  taxPeriodNumber: number;
  departmentId: number;
  taxRate: number;
  pensionRate: number;
  otherDeductionRate: number;
  useUkProgressiveTax: boolean;
  taxRegion: string;
  includeEmployeeNationalInsurance: boolean;
  currency: string;
}


export interface PayrollConfiguration {
  id: number;
  effectiveFrom: string;
  taxYearStartMonth: number;
  taxYearStartDay: number;
  defaultTaxRegion: string;
  enableProgressiveTax: boolean;
  enableEmployeeNi: boolean;
  autoEnrollEarningsTriggerAnnual: number;
  defaultEmployeePensionRate: number;
  defaultEmployerPensionRate: number;
  isActive: boolean;
}

export interface AddPayrollConfigurationFormValues {
  effectiveFrom: string;
  taxYearStartMonth: number;
  taxYearStartDay: number;
  defaultTaxRegion: string;
  enableProgressiveTax: boolean;
  enableEmployeeNi: boolean;
  autoEnrollEarningsTriggerAnnual: number;
  defaultEmployeePensionRate: number;
  defaultEmployerPensionRate: number;
  isActive?: boolean;
}

