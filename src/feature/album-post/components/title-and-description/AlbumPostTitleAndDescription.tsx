import styles from "./AlbumPostTitleAndDescription.module.scss";
import { MgText } from "../../../../components/text/MgText";
import { Grid } from "@mui/material";

interface AlbumPostTitleAndDescriptionProps {
  title: string;
  description: string;
}

const AlbumPostTitleAndDescription = ({
  title,
  description,
}: AlbumPostTitleAndDescriptionProps) => {
  return (
    <Grid className={styles.titleAndDescription} container item xs={12}>
      <div className={styles.titleAndDescription_title}>
        <MgText variant={"h5"} content={title} />
      </div>
      <div>
        <MgText
          variant={"body2"}
          content={description}
          className={styles.titleAndDescription_description}
        />
      </div>
    </Grid>
  );
};

export default AlbumPostTitleAndDescription;
