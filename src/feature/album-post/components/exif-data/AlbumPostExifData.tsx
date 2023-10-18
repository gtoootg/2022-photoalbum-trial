import { CircularProgress, Grid } from "@mui/material";
import styles from "./AlbumPostExifData.module.scss";
import { MgText } from "../../../../components/text/MgText";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraIcon from "@mui/icons-material/Camera";
import NetworkWifi1BarIcon from "@mui/icons-material/NetworkWifi1Bar";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import IsoIcon from "@mui/icons-material/Iso";
import { ExifData } from "../../../../api/flickr-images/flickr-images.api.types";
import { JSXElement } from "@typescript-eslint/types/dist/generated/ast-spec";
import { ReactNode } from "react";

const AlbumPostExifData = ({
  exifDataOfMainImage,
}: {
  exifDataOfMainImage?: ExifData;
}) => {
  if (!exifDataOfMainImage) {
    return null;
  }

  const { camera, fNumber, exposure, focalLength, iso } = exifDataOfMainImage;

  return (
    <Grid className={styles.exifData} item xs={12} container>
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
