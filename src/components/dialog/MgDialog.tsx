import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { MgDialogProps } from "./MgDialog.types";
import { MgButton } from "../button/MgButton";

export const MgDialog = ({
  isOpen,
  maxWidth,
  content,
  buttonConfig,
}: MgDialogProps) => {
  return (
    <Dialog open={isOpen} maxWidth={maxWidth} fullWidth={true}>
      <DialogContent>{content}</DialogContent>
      {buttonConfig && (
        <DialogActions>
          <MgButton
            variant={"text"}
            link={buttonConfig.cancelButton.link}
            onClick={buttonConfig.cancelButton.handleCancel}
            text={buttonConfig.cancelButton.label}
          />
          <MgButton
            variant={"contained"}
            link={buttonConfig.submitButton.link}
            onClick={buttonConfig.submitButton.handleSubmit}
            text={buttonConfig.submitButton.label}
          />
        </DialogActions>
      )}
    </Dialog>
  );
};
