import { CircularProgress, Grid } from "@mui/material";
import styles from "./AlbumPostExifData.module.scss";
import { Text } from "../../../../components/text/Text";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraIcon from "@mui/icons-material/Camera";
import NetworkWifi1BarIcon from "@mui/icons-material/NetworkWifi1Bar";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import IsoIcon from "@mui/icons-material/Iso";

const AlbumPostExifData = ({ exifDataOfMainImage }) => {
  if (!exifDataOfMainImage) {
    return <CircularProgress />;
  }

  const { camera, fNumber, exposure, focalLength, iso } = exifDataOfMainImage;

  return (
    <>
      <div className={styles.camera}>
        <CameraAltIcon className={styles.camera_icon} />
        <Text content={camera} variant={"h6"} />
      </div>
      <Grid className={styles.otherInfo} container>
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
    </>
  );
};

export default AlbumPostExifData;

const IconAndExifData = ({ icon, exifData }) => {
  return (
    <Grid item className={styles.otherInfo_element} xs={6}>
      {icon}
      <Text content={exifData} variant={"body1"} />
    </Grid>
  );
};
