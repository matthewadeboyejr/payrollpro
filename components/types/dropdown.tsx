export interface DropdownProps {
  options: {
    title: string;
    onClick: () => void;
  }[];
  label: string;
  size?: "sm" | "md" | "lg";
  value?: string;
}
