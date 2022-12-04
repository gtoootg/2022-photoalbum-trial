export interface CommonDialogProps {
  isOpen: boolean;
  maxWidth?: "md" | "xs" | "sm" | "lg" | "xl";
  content: JSX.Element;
  handleClose?: () => void;
}
