export interface ModalProps {
  secondaryBtnText?: string;
  submitBtnText?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  heading?: string;
  desc?: string;
  children: React.ReactNode;
  onClose: () => void;
  secondaryBtnColor?: string;
}
