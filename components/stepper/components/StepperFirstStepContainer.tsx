import { FlickrImagesProps } from "../../../pages/flickrApi";
import ImageListBox from "../../image-list-box/ImageListBox";
import Image from "next/image";
import { Box } from "@mui/material";

export default function StepperFirstStepContainer(props: any) {
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
    console.log(FilterSelectedFlickrImages);
    return (
      <div style={{ display: "flex" }}>
        {FilterSelectedFlickrImages.map(
          (uploadingDataImages: any, i: number) => (
            <div
              key={i}
              style={{
                width: 150,
                height: 100,
                borderRadius: 10,
                overflow: "hidden",
                margin: 10,
              }}
            >
              <Image
                alt="image"
                src={uploadingDataImages["url_h"]}
                width={150}
                height={100}
              />
            </div>
          )
        )}
      </div>
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
