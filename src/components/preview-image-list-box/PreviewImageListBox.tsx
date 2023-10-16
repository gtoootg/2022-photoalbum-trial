import { Box, Grid } from "@mui/material";
import Image from "next/image";
import styles from "./PreviewImageListBox.module.scss";
import { Text } from "../text/Text";
import { useUploadingFlickrImages } from "../../feature/upload/components/stepper/first-stepper/hooks/use-uploading-flickr-images.hooks";

export const PreviewImageListBox = ({
  helperText,
  onClickImageCallback,
  getImageOpacity,
}: {
  helperText?: string;
  onClickImageCallback?: (id: string) => void;
  getImageOpacity?: (id: string) => string;
}) => {
  const flickrImagesToUse = useUploadingFlickrImages();

  return (
    <Box>
      <Text variant={"body2"} content={helperText} />
      <Grid container spacing={1}>
        {flickrImagesToUse.map(({ url_n, id }) => (
          <Grid key={id} item xs={2.4}>
            <Box
              className={styles.imageBox}
              sx={{ opacity: getImageOpacity ? getImageOpacity(id) : "1" }}
              onClick={() => {
                onClickImageCallback && onClickImageCallback(id);
              }}
            >
              <Image
                className={styles.image}
                alt="image"
                src={url_n}
                width={300}
                height={200}
                layout="responsive"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
