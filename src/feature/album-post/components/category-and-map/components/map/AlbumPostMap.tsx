import GoogleMapApi from "../../../../../../components/google-map/GoogleMapApi";
import styles from "./AlbumPostMap.module.scss";
import { MgButton } from "../../../../../../components/button/MgButton";
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
        <MgButton
          text={t("map.dialog-link.button", { ns: "album-post" })}
          onClick={() => {}}
          variant={"contained"}
          endIcon={<MapIcon />}
          className={styles.mapContainer_dialogLink_button}
        />
      </div>

      <AlbumPostMap uploadedPost={uploadedPost} />
    </div>
  );
};

export const AlbumPostMap = ({
  uploadedPost,
}: {
  uploadedPost: GetAlbumPostResponse;
}) => {
  const { lat, lng } = uploadedPost;
  return (
    <></>
    // <GoogleMapApi
    //   center={{ lat: 1, lng: 1 }}
    //   zoom={10}
    //   markerPositions={[{ lat: 1, lng: 1 }]}
    // />
  );
};
