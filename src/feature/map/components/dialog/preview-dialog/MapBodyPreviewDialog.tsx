import { CommonDialog } from "../../../../../components/dialog/CommonDialog";
import {useMapBodyPreviewDialogConfig} from "./MapBodyPreviewDialog.hooks";

export const MapBodyPreviewDialog = ({ isOpen }) => {

  const {buttonConfig }=useMapBodyPreviewDialogConfig()

  return(
    <CommonDialog
      isOpen={isOpen}
      content={<></>}
      buttonConfig={buttonConfig}
    />
  )

};


