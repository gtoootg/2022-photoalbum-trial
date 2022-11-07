import ImageListBox from "../../image-list-box/ImageListBox";
import Image from "next/image";
import { StepperFirstStepContainerProps } from "../Stepper.types";
import { Box } from "@mui/material";

export default function StepperFirstStepContainer(
  props: StepperFirstStepContainerProps
) {
  const {
    activeStep,
    uploadingDataImages,
    setUploadingDataImages,
    flickrImages,
  } = props;

  const FilterSelectedFlickrImages = [];

  if (activeStep !== 0) {
    return (
      <Box style={{ display: "flex" }}>
        {FilterSelectedFlickrImages.map(
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
    );
  }

  return (
    <ImageListBox
      activeStep={activeStep}
      images={flickrImages}
      uploadingDataImages={uploadingDataImages}
      setUploadingDataImages={setUploadingDataImages}
    />
  );
}
