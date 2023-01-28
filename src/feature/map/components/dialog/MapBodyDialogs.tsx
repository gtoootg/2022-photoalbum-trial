import { MapBodyPreviewDialog } from "./preview-dialog/MapBodyPreviewDialog";

export enum MapBodyDialogType {
  PREVIEW_DIALOG,
}

export const MapBodyDialogs = ({
  dialogType,
}: {
  dialogType: MapBodyDialogType;
}) => {
  return (
    <>
      <MapBodyPreviewDialog
        isOpen={dialogType === MapBodyDialogType.PREVIEW_DIALOG}
      />
    </>
  );
};
