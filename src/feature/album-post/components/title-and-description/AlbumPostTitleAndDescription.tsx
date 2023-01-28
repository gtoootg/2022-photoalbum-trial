import styles from "./AlbumPostTitleAndDescription.module.scss";
import { Text } from "../../../../components/text/Text";
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
        <Text variant={"h5"} content={title} />
      </div>
      <div>
        <Text
          variant={"body2"}
          content={description}
          className={styles.titleAndDescription_description}
        />
      </div>
    </Grid>
  );
};

export default AlbumPostTitleAndDescription;
