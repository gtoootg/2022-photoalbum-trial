import {
  SnackbarType,
  useSnackbarMessageState,
} from "./use-snackbar-message.reactive-vars";
import { useCallback } from "react";

export const useShowSnackbar = () => {
  const [, setSnackbarMessage] = useSnackbarMessageState();

  return useCallback(
    ({ message, status }: { message?: string; status?: number }) => {
      if (!status) {
        return;
      }

      let type: SnackbarType["type"];
      if (status === 200) {
        type = "success";
      }
      if (status !== 200) {
        type = "error";
      }

      setSnackbarMessage({ message, type });
    },
    [setSnackbarMessage]
  );
};
