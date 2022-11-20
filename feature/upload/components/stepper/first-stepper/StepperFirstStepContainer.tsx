import ImageListBox from "../../image-list-box/ImageListBox";
import Image from "next/image";
import { StepperFirstStepContainerProps } from "../UploadStepper.types";
import { Box } from "@mui/material";
import { filterFlickrImagesByUploadDataImageId } from "../../../../../pages/flickrApi";
import styles from "./StepperFirstStepContainer.module.scss";
import { PreviewImageListBox } from "../../../../../components/preview-image-list-box/PreviewImageListBox";

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
      <PreviewImageListBox
        imagesSrc={filterSetectedFlickrImages.map(
          (flickrImage) => flickrImage["url_n"]
        )}
      />
      // <>
      //   <Box className={styles.preview_box}>
      //     {filterSetectedFlickrImages.map(
      //       (uploadingDataImages: any, i: number) => (
      //         <div key={i} className={styles.preview_image}>
      //           <Image
      //             alt="image"
      //             src={uploadingDataImages["url_h"]}
      //             width={300}
      //             height={200}
      //             layout="responsive"
      //           />
      //         </div>
      //       )
      //     )}
      //   </Box>
      // </>
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
