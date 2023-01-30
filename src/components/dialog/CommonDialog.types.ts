export interface CommonDialogProps {
  isOpen: boolean;
  maxWidth?: "md" | "xs" | "sm" | "lg" | "xl";
  content: JSX.Element;
  buttonConfig?: CommonDialogButtonProps;
}

export type CommonDialogButtonProps = {
  submitButton: {
    label: string;
    link?:string
    handleSubmit?: () => void;
  };
  cancelButton: {
    label: string;
    link?:string
    handleCancel?: () => void;
  };
};
