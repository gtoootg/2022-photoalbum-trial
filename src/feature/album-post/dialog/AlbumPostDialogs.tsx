import { AlbumPostMapDialog } from "./components/album-post-map-dialog/AlbumPostMapDialog";
import { useContext } from "react";
import { AlbumPostOpeningDialogContext } from "../context-provider/AlbumPostContextProvider";

export enum AlbumPostDialogsType {
  MAP,
}

export const AlbumPostDialogs = ({ uploadedPost }) => {
  const [openingDialog] = useContext(AlbumPostOpeningDialogContext);

  return (
    <>
      <AlbumPostMapDialog
        isOpen={openingDialog === AlbumPostDialogsType.MAP}
        uploadedPost={uploadedPost}
      />
    </>
  );
};
