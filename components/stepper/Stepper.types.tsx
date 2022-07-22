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

export interface StepperSecondStepContainerProps {
  setUploadingDataTitle: (value: string) => void;
  setUploadingDataDescription: (value: string) => void;
}
