import { Box, Grid } from "@mui/material";
import Image from "next/image";
import styles from "./PreviewImageListBox.module.scss";
import { Text } from "../text/Text";
import { useEffect, useState } from "react";

export const PreviewImageListBox = ({
  imagesSrc,
  helperText,
  handleClickImages,
}: {
  imagesSrc: string[];
  helperText?: string;
  handleClickImages?: any;
}) => {
  const [selectedImagesId, setSelectedImagesId] = useState([]);

  const isImageSelected = (index) => selectedImagesId.includes(index);

  return (
    <>
      <Box>
        <Text variant={"body2"} content={helperText} />
        <Grid container spacing={1}>
          {imagesSrc.map((imageSrc: string, i: number) => (
            <Grid key={i} item xs={2.4}>
              <div
                className={`${styles.image} ${
                  handleClickImages && !isImageSelected(i) && styles.transparent
                }`}
                onClick={() => {
                  let newSelectedImagesId = [...selectedImagesId];
                  if (isImageSelected(i)) {
                    const excludeClickedImageId = newSelectedImagesId.filter(
                      (imageId) => {
                        return imageId !== i;
                      }
                    );

                    handleClickImages(excludeClickedImageId);
                    setSelectedImagesId(excludeClickedImageId);
                    return;
                  }
                  newSelectedImagesId.push(i);
                  handleClickImages(newSelectedImagesId);
                  setSelectedImagesId(newSelectedImagesId);
                }}
              >
                <Image
                  alt="image"
                  src={imageSrc}
                  width={300}
                  height={200}
                  layout="responsive"
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
