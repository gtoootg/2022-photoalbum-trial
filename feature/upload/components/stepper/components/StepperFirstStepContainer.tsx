import ImageListBox from "../../image-list-box/ImageListBox";
import Image from "next/image";
import { StepperFirstStepContainerProps } from "../Stepper.types";
import { Box } from "@mui/material";
import { filterFlickrImagesByUploadDataImageId } from "../../../../../pages/flickrApi";

export default function StepperFirstStepContainer({
  activeStep,
  uploadingData,
  setUploadingData,
  flickrImages,
}: StepperFirstStepContainerProps) {
  const filterSetectedFlickrImages = filterFlickrImagesByUploadDataImageId(
    uploadingData.flickrImageIds,
    flickrImages
  );

  if (activeStep !== 0) {
    return (
      <>
        <Box style={{ display: "flex" }}>
          {filterSetectedFlickrImages.map(
            (uploadingDataImages: any, i: number) => (
              <div
                key={i}
                style={{
                  width: 300,
                  height: "auto",
                  borderRadius: 10,
                  overflow: "hidden",
                  margin: 10,
                }}
              >
                <Image
                  alt="image"
                  src={uploadingDataImages["url_h"]}
                  width={300}
                  height={200}
                  layout="responsive"
                />
              </div>
            )
          )}
        </Box>
      </>
    );
  }

  return (
    <ImageListBox
      flickrImages={flickrImages}
      uploadingData={uploadingData}
      setUploadingData={setUploadingData}
    />
  );
}
