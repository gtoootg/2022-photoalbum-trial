import { CommonDialog } from "../../../../../components/dialog/CommonDialog";
import { useContext } from "react";
import { AlbumPostOpeningDialogContext } from "../../../context-provider/AlbumPostContextProvider";
import GoogleMapApi from "../../../../../components/google-map/GoogleMapApi";
import styles from "./AlbumPostMapDialog.module.scss";

export const AlbumPostMapDialog = ({ isOpen, uploadedPost }) => {
  const [openingDialog, setOpeningDialog] = useContext(
    AlbumPostOpeningDialogContext
  );

  return (
    <CommonDialog
      isOpen={isOpen}
      content={<AlbumPostMapDialogContent uploadedPost={uploadedPost} />}
      handleClose={() => setOpeningDialog(undefined)}
      maxWidth={"md"}
    />
  );
};

const AlbumPostMapDialogContent = ({ uploadedPost }) => {
  return (
    <div className={styles.map}>
      <GoogleMapApi
        center={{ lat: uploadedPost.lat, lng: uploadedPost.lng }}
        zoom={10}
        uploadingDataLatLng={{ lat: uploadedPost.lat, lng: uploadedPost.lng }}
      />
    </div>
  );
};
