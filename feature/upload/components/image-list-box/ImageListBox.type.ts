import { FlickrImageProps } from "../../../../pages/flickrApi";
import { UploadingDataProps } from "../../upload.types";

export interface ImageListBoxProps {
  flickrImages: FlickrImageProps[];
  uploadingData: UploadingDataProps;
  setUploadingData: (value: UploadingDataProps) => void;
  // activeStep: number;
}
