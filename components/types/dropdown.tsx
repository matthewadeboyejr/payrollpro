import { ReactNode } from "react";

export interface DropdownProps {
  options: {
    title: string;
    onClick: () => void | Promise<void>;
    icon?: ReactNode;
    disabled?: boolean;
  }[];
  label?: string;
  size?: "sm" | "md" | "lg";
  value?: string;
}
