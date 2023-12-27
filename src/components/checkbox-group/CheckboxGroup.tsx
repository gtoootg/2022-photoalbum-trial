import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import {
  CheckboxGroupProps,
  CheckboxWithSubComponentProps,
} from "./CheckboxGroup.types";
import { CheckboxSubcomponentStyled } from "./CheckboxGroup.styled";

export const CheckboxGroup = ({
  options,
  handleClickCheckbox,
  subComponents,
}: CheckboxGroupProps) => {
  return (
    <Box>
      {options.map((option, i) => {
        return (
          <CheckBoxWithSubComponent
            key={option.label}
            handleClickCheckbox={handleClickCheckbox}
            option={option}
            subComponent={subComponents && subComponents[i]}
          />
        );
      })}
    </Box>
  );
};

const CheckBoxWithSubComponent = ({
  subComponent,
  handleClickCheckbox,
  option,
}: CheckboxWithSubComponentProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => {
                handleClickCheckbox &&
                  handleClickCheckbox(option.value, e.target.checked);
                setIsChecked(e.target.checked);
              }}
            />
          }
          label={option.label}
        />
      </Box>
      {isChecked && (
        <CheckboxSubcomponentStyled mb={2}>
          {subComponent}
        </CheckboxSubcomponentStyled>
      )}
    </Box>
  );
};
