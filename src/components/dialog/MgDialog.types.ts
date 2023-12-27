export interface MgDialogProps {
  isOpen: boolean;
  maxWidth?: "md" | "xs" | "sm" | "lg" | "xl";
  content: JSX.Element;
  buttonConfig?: MgDialogButtonProps;
}

export type MgDialogButtonProps = {
  submitButton: {
    label: string;
    link?: string;
    handleSubmit?: () => void;
  };
  cancelButton: {
    label: string;
    link?: string;
    handleCancel?: () => void;
  };
};
