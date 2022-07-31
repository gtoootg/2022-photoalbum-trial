import { FlickrImagesProps } from "../../../pages/flickrApi";
import ImageListBox from "../../image-list-box/ImageListBox";
import Image from "next/image";
import { StepperFirstStepContainerProps } from "../Stepper.types";
import { Box } from "@mui/material";

export default function StepperFirstStepContainer(
  props: StepperFirstStepContainerProps
) {
  const {
    activeStep,
    images,
    uploadingDataImages,
    setUploadingDataImages,
    flickrImages,
  } = props;

  const FilterSelectedFlickrImages = flickrImages.filter(
    (flickrImage: FlickrImagesProps) => {
      return uploadingDataImages.includes(flickrImages.indexOf(flickrImage));
    }
  );

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
      images={images}
      uploadingDataImages={uploadingDataImages}
      setUploadingDataImages={setUploadingDataImages}
    />
  );
}
