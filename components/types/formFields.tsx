import { FormRenderProps } from "react-final-form";

export interface FormState {
  submitFailed: boolean | undefined;
  errors: Record<string, string>;
}

export interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  form: unknown;
  classes?: string;
  readonly?: boolean;
  desc?: string;
}

export interface TextareaInputProps {
  label: string;
  name: string;
  placeholder?: string;
  form: unknown;
  desc?: string;
}
export interface SelectInputProps {
  label: string;
  name: string;
  form: unknown;
  options: { value: string; label: string }[];
  desc?: string;
  readonly?: boolean;
  multiple?: boolean;
}

// React Final Form specific types
export interface FinalFormProps {
  form: unknown;
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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  check?: boolean;
}

export type SignupFormProps = FinalFormProps;

// Add New Employee Form specific types

export interface AddNewEmployeeFormValues {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  annualSalary: string;
  startDate: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  status?: string;
}

export type AddNewEmployeeFormProps = FinalFormProps;
export interface AddNewExpenseFormValues {
  employeeId: string;
  category: string;
  description: string;
  currency: string;
  amount: string;
  date: string;
  status: string;
  receiptReference: string;
}

export type AddNewExpenseFormProps = FinalFormProps;
export interface NewLeaveFormValues {
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  submittedDate: string;
  approvedBy: string;
  approvedDate: string;
  duration: string;
}

export type NewLeaveFormProps = FinalFormProps;
export interface ReviewExpenseFormValues {
  comments: string;
}

export type ReviewExpenseFormProps = FinalFormProps;

export interface ReviewLeaveFormValues {
  comments: string;
}

export type ReviewLeaveFormProps = FinalFormProps;

export type FormProps = FinalFormProps;

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
