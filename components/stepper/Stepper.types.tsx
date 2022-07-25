import { ChangeEventHandler } from "react";
import { FlickrImagesProps } from "../../pages/flickrApi";

export interface StepProps {
  label: string;
  description: string;
  content: JSX.Element;
}

export interface VerticalStepperProps {
  flickrImages: FlickrImagesProps[];
  countries: any[] | undefined;
  uploadingDataImages: number[];
  uploadingDataCountry: string;
  uploadingDataCategory: string;
  uploadingDataLatLng: { lat: number; lng: number };
  setUploadingDataImages: (value: number[]) => void;
  setUploadingDataTitle: (value: string) => void;
  setUploadingDataDescription: (value: string) => void;
  setUploadingDataCountry: (value: string) => void;
  setUploadingDataCategory: (value: string) => void;
  setUploadingDataLatLng: (e: string) => void;
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
  countries: any[] | undefined;
  setUploadingDataCountry: (value: string) => void;
  setUploadingDataCategory: (value: string) => void;
  setUploadingDataLatLng: (e: string) => void;
  uploadingDataCountry: string;
  uploadingDataCategory: string;
  uploadingDataLatLng: { lat: number; lng: number };
}
