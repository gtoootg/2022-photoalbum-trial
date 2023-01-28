import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { CommonDialogProps } from "./CommonDialog.types";

export const CommonDialog = ({
  isOpen,
  maxWidth,
  content,
  buttonConfig,
}: CommonDialogProps) => {
  return (
    <Dialog open={isOpen} maxWidth={maxWidth} fullWidth={true}>
      <DialogContent>{content}</DialogContent>
      {/*{buttonConfig && (*/}
      {/*  <>*/}
      {/*    <DialogActions>*/}
      {/*      <Button onClick={() => cancelButton.handleCancel}>*/}
      {/*        {cancelButton.label}*/}
      {/*      </Button>*/}
      {/*    </DialogActions>*/}
      {/*    <DialogActions>*/}
      {/*      <Button onClick={() => submitButton.handleSubmit}>*/}
      {/*        {submitButton.label}*/}
      {/*      </Button>*/}
      {/*    </DialogActions>*/}
      {/*  </>*/}
      {/*)}*/}
    </Dialog>
  );
};
