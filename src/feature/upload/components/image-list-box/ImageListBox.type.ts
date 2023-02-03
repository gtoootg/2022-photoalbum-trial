import { FlickrImageProps } from "../../../../helper/flickrApi/flickrApi";
import { UploadingDataProps } from "../../Upload.types";

export interface ImageListBoxProps {
  flickrImages: FlickrImageProps[];
  uploadingData: UploadingDataProps;
  setUploadingData: (value: UploadingDataProps) => void;
  // activeStep: number;
}
