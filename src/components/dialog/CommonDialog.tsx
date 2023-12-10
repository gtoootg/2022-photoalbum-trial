import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { CommonDialogProps } from "./CommonDialog.types";
import { MgButton } from "../button/MgButton";

export const CommonDialog = ({
  isOpen,
  maxWidth,
  content,
  buttonConfig,
}: CommonDialogProps) => {
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
