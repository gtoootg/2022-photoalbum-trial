import GoogleMapApi from "../../../../../../components/google-map/GoogleMapApi";
import styles from "./AlbumPostMap.module.scss";
import { CommonButton } from "../../../../../../components/button/CommonButton";
import MapIcon from "@mui/icons-material/Map";
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { AlbumPostDialogsType } from "../../../../dialog/AlbumPostDialogs";
import { AlbumPostOpeningDialogContext } from "../../../../context-provider/AlbumPostContextProvider";

export const AlbumPostMap = ({ uploadedPost }) => {
  const { t } = useTranslation();

  const [openingDialog, setOpeningDialog] = useContext(
    AlbumPostOpeningDialogContext
  );

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapContainer_dialogLink}>
        <CommonButton
          text={t("map.dialog-link.button", { ns: "album-post" })}
          onClick={() => {
            setOpeningDialog(AlbumPostDialogsType.MAP);
          }}
          variant={"contained"}
          endIcon={<MapIcon />}
          className={styles.mapContainer_dialogLink_button}
        />
      </div>
      <div className={styles.mapContainer_map}>
        <GoogleMapApi
          center={{ lat: uploadedPost.lat, lng: uploadedPost.lng }}
          zoom={0.3}
          uploadingDataLatLng={{ lat: uploadedPost.lat, lng: uploadedPost.lng }}
        />
      </div>
    </div>
  );
};
