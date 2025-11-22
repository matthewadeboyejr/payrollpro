export interface ModalProps {
  secondaryBtnText?: string;
  submitBtnText?: string;
  showSubmitBtn?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  heading?: string;
  desc?: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitBtnDisabled?: boolean;
  secondaryBtnColor?: string;
  isSubmitting?: boolean;
}
