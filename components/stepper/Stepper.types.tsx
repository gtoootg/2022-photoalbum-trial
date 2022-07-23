import { FlickrImagesProps } from "../../pages/flickrApi";

export interface StepProps {}

export interface StepperButtonGroupProps {
  index: number;
  steps: StepProps[];
  handleNext: () => void;
  handleBack: () => void;
  uploadingDataImages: number[];
  activeStep: number;
}

export interface StepperFirstStepContainerProps {
  activeStep: number;
  images: FlickrImagesProps[];
  uploadingDataImages: number[];
  setUploadingDataImages: (value: number[]) => void;
  flickrImages: FlickrImagesProps[];
}

export interface StepperSecondStepContainerProps {
  setUploadingDataTitle: (value: string) => void;
  setUploadingDataDescription: (value: string) => void;
}
