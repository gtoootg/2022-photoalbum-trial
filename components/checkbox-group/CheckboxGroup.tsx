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
}

export const CheckboxGroup = ({
  options,
  handleClickCheckbox,
}: CheckboxGroupProps) => {
  return (
    <FormGroup>
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
