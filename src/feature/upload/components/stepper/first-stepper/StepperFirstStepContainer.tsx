import ImageListBox from "../../image-list-box/ImageListBox";
import { StepperFirstStepContainerProps } from "../UploadStepper.types";
import { PreviewImageListBox } from "../../../../../components/preview-image-list-box/PreviewImageListBox";
import { filterFlickrImagesByUploadDataImageId } from "../../../../../api/flickr-images/use-get-flickr-images.hooks";

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
