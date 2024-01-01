import { Box, Grid, Typography } from "@mui/material";
import { useUploadingFlickrImages } from "../../feature/upload/components/stepper/first-stepper/hooks/use-uploading-flickr-images.hooks";
import {
  PreviewImageBoxStyled,
  PreviewImageStyled,
} from "./PreviewImageListBox.styled";

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
      <Typography variant={"body2"}>{helperText}</Typography>
      <Grid container spacing={1}>
        {flickrImagesToUse.map(({ url_n, id }) => (
          <Grid key={id} item xs={2.4}>
            <PreviewImageBoxStyled
              opacity={getImageOpacity && getImageOpacity(id)}
              onClick={() => {
                onClickImageCallback && onClickImageCallback(id);
              }}
            >
              <PreviewImageStyled
                alt="image"
                src={url_n}
                width={300}
                height={200}
                layout="responsive"
              />
            </PreviewImageBoxStyled>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
