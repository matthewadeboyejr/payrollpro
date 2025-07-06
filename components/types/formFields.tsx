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

// Generic form validation types
export interface FormValidationResult {
  [key: string]: string[];
}

export interface FormConstraints {
  [key: string]: Record<string, unknown>;
}
