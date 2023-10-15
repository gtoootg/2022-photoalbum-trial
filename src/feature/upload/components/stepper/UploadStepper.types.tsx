import { ImageListBoxProps } from "../image-list-box/ImageListBox.type";

export interface StepProps {
  label: string;
  description: string;
  content?: JSX.Element;
  isButtonDisabledCondition?: any;
}

export interface UploadStepperProps extends ImageListBoxProps {
  countries: any[] | undefined;

  // uploadingDataImages: string[];
  // uploadingDataTitle: string;
  // uploadingDataDescription: string;
  // uploadingDataCountry: string;
  // uploadingDataCategory: string;
  // uploadingDataLatLng: { lat: number; lng: number };
  // setUploadingDataImages: (value: number[]) => void;
  // setUploadingDataTitle: (value: string) => void;
  // setUploadingDataDescription: (value: string) => void;
  // setUploadingDataCountry: (value: string) => void;
  // setUploadingDataCategory: (value: string) => void;
  // setUploadingDataLatLng: (e: string) => void;
}

export interface StepperButtonGroupProps {
  index: number;
  steps: StepProps[];
  handleNext: () => void;
  handleUpload: () => void;
  handleBack: () => void;
  activeStep: number;
  isButtonDisabledCondition?: any;
}

export interface StepperFirstStepContainerProps extends ImageListBoxProps {}

export type StepperSecondStepContainerProps = Omit<
  StepperFirstStepContainerProps,
  "flickrImages"
>;

export interface StepperThirdStepContainerProps
  extends StepperSecondStepContainerProps {
  countries: any[] | undefined;
}
