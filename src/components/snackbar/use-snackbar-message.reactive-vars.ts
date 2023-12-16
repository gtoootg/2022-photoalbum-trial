import { createGlobalState } from "react-use";

export interface SnackbarType {
  type?: "success" | "error" | "warning";
  message?: string;
}

export const useSnackbarMessageState = createGlobalState<SnackbarType | null>(
  null
);
