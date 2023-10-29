import { Box, Grid } from "@mui/material";
import styles from "./AlbumPostExifData.module.scss";
import { MgText } from "../../../../components/text/MgText";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraIcon from "@mui/icons-material/Camera";
import NetworkWifi1BarIcon from "@mui/icons-material/NetworkWifi1Bar";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import IsoIcon from "@mui/icons-material/Iso";
import { ReactNode } from "react";
import { useExifDataOfAlbumPost } from "../../hooks/use-get-album-post.hooks";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

const AlbumPostExifData = ({
  indexOfMainImage,
}: {
  indexOfMainImage: number;
}) => {
  const { t } = useTranslation();
  const exifDataOfMainImage = useExifDataOfAlbumPost(indexOfMainImage);

  if (!exifDataOfMainImage) {
    return null;
  }

  const { camera, fNumber, exposure, focalLength, iso } = exifDataOfMainImage;

  const isAllExifDateEmpty = Object.values(exifDataOfMainImage).every(
    (value) => value === "---"
  );

  return (
    <Box className={styles.box}>
      {isAllExifDateEmpty && (
        <Box
          className={styles.blindIcon}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <VisibilityIcon />
          <Typography>
            {t("album-post.exif.empty.text", { ns: "album-post" })}
          </Typography>
        </Box>
      )}
      <Grid
        className={styles.exifDataGrid}
        item
        xs={12}
        container
        sx={{
          filter: isAllExifDateEmpty ? "blur(2px)" : undefined,
          opacity: isAllExifDateEmpty ? 0.2 : 1,
        }}
      >
        <Grid className={styles.camera} container>
          <CameraAltIcon className={styles.camera_icon} />
          <MgText content={camera} variant={"h6"} />
        </Grid>
        <Grid className={styles.otherInfo} container xs={12}>
          <IconAndExifData
            icon={<CameraIcon className={styles.otherInfo_icon} />}
            exifData={`f/${fNumber}`}
          />
          <IconAndExifData
            icon={<NetworkWifi1BarIcon className={styles.otherInfo_icon} />}
            exifData={focalLength}
          />
          <IconAndExifData
            icon={<ShutterSpeedIcon className={styles.otherInfo_icon} />}
            exifData={exposure}
          />
          <IconAndExifData
            icon={<IsoIcon className={styles.otherInfo_icon} />}
            exifData={`ISO ${iso}`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AlbumPostExifData;

const IconAndExifData = ({
  icon,
  exifData,
}: {
  icon: ReactNode;
  exifData: ReactNode;
}) => {
  return (
    <Grid item className={styles.otherInfo_element} xs={5}>
      {icon}
      <MgText content={exifData} variant={"body1"} />
    </Grid>
  );
};
