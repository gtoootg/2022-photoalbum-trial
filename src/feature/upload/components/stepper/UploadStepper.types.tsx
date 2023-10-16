export interface StepProps {
  label: string;
  description: string;
  content?: JSX.Element;
  isButtonDisabledCondition?: any;
}

export interface StepperButtonGroupProps {
  index: number;
  steps: StepProps[];
  isButtonDisabledCondition?: any;
}
