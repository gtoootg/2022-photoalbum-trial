import { Box, Card } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import { SetStateAction } from "react";
import { FlickrImagesProps } from "../../../../pages/flickrApi";

interface ImageListBoxProps {
  images: FlickrImagesProps[];
  uploadingDataImages: number[];
  setUploadingDataImages: any;
  activeStep: number;
}

export default function ImageListBox({
  images,
  uploadingDataImages,
  setUploadingDataImages,
  activeStep,
}: ImageListBoxProps) {
  const selectImage = async (i: number) => {
    const sliceUploadingImages: number[] = uploadingDataImages.slice();
    if (activeStep === 0) {
      if (!sliceUploadingImages.includes(i)) {
        if (sliceUploadingImages.length >= 5) {
          alert("You can select up to only 5 images ");
          return;
        }
        await sliceUploadingImages.push(i);
        setUploadingDataImages(sliceUploadingImages);
      } else {
        const removeClickedImage = uploadingDataImages.filter(function (
          images
        ) {
          return images !== i;
        });
        setUploadingDataImages(removeClickedImage);
      }
    }
  };

  return (
    <Box sx={{ margin: "2rem" }}>
      <ImageList
        sx={{ width: "50rem", height: "25rem", margin: "0 auto" }}
        cols={3}
      >
        {images.map((image, i) => (
          <ImageListItem key={i}>
            <div
              style={{
                margin: "5px",
                transition: "0.3s",
                opacity: uploadingDataImages.includes(i) ? "1" : "0.6",
                borderRadius: "10px",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <Image
                onClick={() => selectImage(i)}
                src={image["url_h"]}
                height={200}
                width={300}
                alt={"image"}
              />
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
