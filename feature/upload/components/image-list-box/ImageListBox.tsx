import { Box, Card } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import { useEffect } from "react";
import { UploadingDataProps } from "../../upload.types";
import { ImageListBoxProps } from "./ImageListBox.type";

export default function ImageListBox({
  flickrImages,
  uploadingData,
  setUploadingData,
}: ImageListBoxProps) {
  useEffect(() => {
    console.log(uploadingData);
  }, [uploadingData]);

  return (
    <Box sx={{ margin: "2rem" }}>
      <ImageList
        sx={{ width: "50rem", height: "25rem", margin: "0 auto" }}
        cols={3}
      >
        {flickrImages?.map((flickrImage, i) => (
          <ImageListItem key={i}>
            <div
              style={{
                margin: "5px",
                transition: "0.3s",
                opacity: uploadingData.flickrImageIds.includes(
                  flickrImage["id"]
                )
                  ? "1"
                  : "0.6",
                borderRadius: "10px",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <Image
                onClick={() =>
                  selectOrUnselectFlickrImage(
                    flickrImage["id"],
                    uploadingData,
                    setUploadingData
                  )
                }
                src={flickrImage["url_h"]}
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

const selectOrUnselectFlickrImage = async (
  idOfClickedFlickrImage: string,
  uploadingData: UploadingDataProps,
  setUploadingData: (value: UploadingDataProps) => void
) => {
  const isClickedFlickrImageAlreadySelected =
    uploadingData.flickrImageIds.includes(idOfClickedFlickrImage);

  const currentUploadingDataFlickrImageIdsArray =
    uploadingData.flickrImageIds.slice();

  if (isClickedFlickrImageAlreadySelected) {
    const removeClickedFlickrImage =
      currentUploadingDataFlickrImageIdsArray.filter((uploadingDataImage) => {
        return uploadingDataImage !== idOfClickedFlickrImage;
      });

    setUploadingData({
      ...uploadingData,
      flickrImageIds: removeClickedFlickrImage,
    });
    return;
  }

  if (currentUploadingDataFlickrImageIdsArray.length >= 5) {
    alert("You can select up to only 5 images ");
    return;
  }

  currentUploadingDataFlickrImageIdsArray.push(idOfClickedFlickrImage);

  setUploadingData({
    ...uploadingData,
    flickrImageIds: currentUploadingDataFlickrImageIdsArray,
  });
};
