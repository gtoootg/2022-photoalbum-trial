import { ReactNode } from "react";

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  handleClickCheckbox?: (
    eventTargetValue: string | number,
    eventTargetChecked: boolean
  ) => void;
  subComponents?: JSX.Element[];
}

export interface CheckboxWithSubComponentProps {
  subComponent: ReactNode;
  handleClickCheckbox?: (
    eventTargetValue: string | number,
    eventTargetChecked: boolean
  ) => void;
  option: CheckboxOption;
}

export interface CheckboxOption {
  label: string;
  value: number | string;
}
