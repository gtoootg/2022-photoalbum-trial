import {Dialog} from "@mui/material";
import {CommonDialogProps} from "./CommonDialog.types";


export const CommonDialog = ({isOpen, maxWidth,content}: CommonDialogProps) => {

  return (
    <Dialog
      open={isOpen}
      maxWidth={maxWidth}
    >
      {content}
    </Dialog>
  )

}