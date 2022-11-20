import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

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
  subComponents?: JSX.Element[];
}

export const CheckboxGroup = ({
  options,
  handleClickCheckbox,
  className,
  subComponents,
}: CheckboxGroupProps) => {
  return (
    <div className={className}>
      {(options || []).map((option, i) => {
        return (
          <CheckBoxWithSubComponent
            key={option.label}
            handleClickCheckbox={handleClickCheckbox}
            option={option}
            subComponent={subComponents && subComponents[i]}
          />
        );
      })}
    </div>
  );
};

const CheckBoxWithSubComponent = ({
  subComponent,
  handleClickCheckbox,
  option,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => {
                handleClickCheckbox(option.value, e.target.checked);
                setIsChecked(e.target.checked);
              }}
            />
          }
          label={option.label}
        />
      </div>
      {isChecked && <div style={{ border: "solid red" }}>{subComponent}</div>}
    </>
  );
};
