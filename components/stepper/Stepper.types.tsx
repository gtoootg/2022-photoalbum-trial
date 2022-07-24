import { ChangeEventHandler } from "react";
import { FlickrImagesProps } from "../../pages/flickrApi";

export interface StepProps {
  label: string;
  description: string;
  content: JSX.Element;
}

export interface VerticalStepperProps {
  flickrImages: FlickrImagesProps[];
  uploadingDataImages: number[];
  setUploadingDataImages: (value: number[]) => void;
  setUploadingDataTitle: (value: string) => void;
  setUploadingDataDescription: (value: string) => void;
  setUploadingDataCountry: (value: string) => void;
}

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

export interface StepperThirdStepContainerProps {
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
