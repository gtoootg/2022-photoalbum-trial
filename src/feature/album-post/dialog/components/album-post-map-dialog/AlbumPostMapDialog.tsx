import { CommonDialog } from "../../../../../components/dialog/CommonDialog";
import { useContext } from "react";
import { AlbumPostOpeningDialogContext } from "../../../context-provider/AlbumPostContextProvider";
import styles from "./AlbumPostMapDialog.module.scss";
import { AlbumPostMap } from "../../../components/category-and-map/components/map/AlbumPostMap";

export const AlbumPostMapDialog = ({ isOpen, uploadedPost }) => {
  const [openingDialog, setOpeningDialog] = useContext(
    AlbumPostOpeningDialogContext
  );

  return (
    <CommonDialog
      isOpen={isOpen}
      content={
        <AlbumPostMap uploadedPost={uploadedPost} className={styles.map} />
      }
      handleClose={() => setOpeningDialog(undefined)}
      maxWidth={"md"}
    />
  );
};
