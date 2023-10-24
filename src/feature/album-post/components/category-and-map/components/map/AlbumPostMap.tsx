import GoogleMapApi from "../../../../../../components/google-map/GoogleMapApi";
import styles from "./AlbumPostMap.module.scss";
import { CommonButton } from "../../../../../../components/button/CommonButton";
import MapIcon from "@mui/icons-material/Map";
import { useTranslation } from "next-i18next";
import { GetAlbumPostResponse } from "../../../../../../api/album-posts/album-posts.api.types";

export const AlbumPostMapWithLinkButton = ({
  uploadedPost,
}: {
  uploadedPost: GetAlbumPostResponse;
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapContainer_dialogLink}>
        <CommonButton
          text={t("map.dialog-link.button", { ns: "album-post" })}
          onClick={() => {}}
          variant={"contained"}
          endIcon={<MapIcon />}
          className={styles.mapContainer_dialogLink_button}
        />
      </div>

      <AlbumPostMap
        uploadedPost={uploadedPost}
      />
    </div>
  );
};

export const AlbumPostMap = ({
  uploadedPost,
}: {
  uploadedPost: GetAlbumPostResponse;
}) => {
  return (

      <GoogleMapApi
        center={{ lat: uploadedPost.lat, lng: uploadedPost.lng }}
        zoom={10}
        uploadingDataLatLng={{ lat: uploadedPost.lat, lng: uploadedPost.lng }}
      />

  );
};
