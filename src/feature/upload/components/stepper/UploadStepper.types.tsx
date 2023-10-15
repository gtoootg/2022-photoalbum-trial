export interface StepProps {
  label: string;
  description: string;
  content?: JSX.Element;
  isButtonDisabledCondition?: any;
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
