import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface CheckboxGroupProps {
  options: {
    label: string;
    value: number | string;
  }[];
  handleClickCheckbox: (
    eventTargetValue: string | number,
    eventTargetChecked: boolean
  ) => void;
  className?: string;
}

export const CheckboxGroup = ({
  options,
  handleClickCheckbox,
  className,
}: CheckboxGroupProps) => {
  return (
    <FormGroup className={className}>
      {options.map((option) => {
        return (
          <FormControlLabel
            key={option.label}
            control={
              <Checkbox
                onChange={(e) => {
                  handleClickCheckbox(option.value, e.target.checked);
                }}
              />
            }
            label={option.label}
          />
        );
      })}
    </FormGroup>
  );
};
