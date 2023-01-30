import { MapBodyPreviewDialog } from "./preview-dialog/MapBodyPreviewDialog";
import { useContext} from "react";
import {
  MapBodyOpeningDialogTypeContext,} from "../../../../pages/map/context-provider/MapBodyContextProvider";

export enum MapBodyDialogType {
  PREVIEW_DIALOG,
}

export const MapBodyDialogs = () => {
  const [openingDialogType, setOpeningDialogType] = useContext(MapBodyOpeningDialogTypeContext)


  return (
    <>
      <MapBodyPreviewDialog
        isOpen={openingDialogType === MapBodyDialogType.PREVIEW_DIALOG}

      />
    </>
  );
};
