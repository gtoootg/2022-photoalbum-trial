import { Alert, AlertProps, Snackbar, SnackbarProps } from "@mui/material";
import { useSnackbarMessageState } from "./use-snackbar-message.reactive-vars";
import { useMemo } from "react";

export const MgSnackbar = () => {
  const [snackbarState, setSnackbarState] = useSnackbarMessageState();

  const snackbarConfig: SnackbarProps = useMemo(
    () => ({
      anchorOrigin: { vertical: "top", horizontal: "center" },
      open: Boolean(snackbarState),
      autoHideDuration: 3000,
      onClose: () => setSnackbarState(null),
    }),
    [snackbarState, setSnackbarState]
  );
  const alertConfig: AlertProps = useMemo(
    () => ({
      severity: snackbarState?.type,
      onClose: () => setSnackbarState(null),
      sx: { width: "100%" },
    }),
    [snackbarState, setSnackbarState]
  );
  const fallbackMessage = useMemo(() => {
    if (snackbarState?.type === "error") {
      return "Something went wrong!";
    }
    return "Success!!";
  }, [snackbarState]);

  if (snackbarState === null) {
    return null;
  }

  return (
    <Snackbar {...snackbarConfig}>
      <Alert {...alertConfig}>
        {snackbarState.message ? snackbarState.message : fallbackMessage}
      </Alert>
    </Snackbar>
  );
};
