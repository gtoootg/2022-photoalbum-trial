import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { CommonDialogProps } from "./CommonDialog.types";

export const CommonDialog = ({
  isOpen,
  maxWidth,
  content,
  handleClose,
}: CommonDialogProps) => {
  return (
    <Dialog open={isOpen} maxWidth={maxWidth} fullWidth={true}>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {handleClose && <Button onClick={handleClose}>Close</Button>}
      </DialogActions>
    </Dialog>
  );
};
