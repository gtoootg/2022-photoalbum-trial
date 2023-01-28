import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

interface SelectBoxProps {
  selectOptions: any[];
  parentKeyName?: string;
  childKeyName?: string;
  handleChange: (value: string) => void;
  helperText?: string;
  label: string;
  value: string;
}

export function SelectBox({
  selectOptions,
  parentKeyName,
  childKeyName,
  handleChange,
  helperText,
  label,
  value,
}: SelectBoxProps) {
  return (
    <TextField
      id="outlined-select"
      select
      label={label}
      value={value}
      onChange={(e) => {
        handleChange(e.target.value);
        console.log(e.target.value);
      }}
      SelectProps={{
        native: true,
      }}
      helperText={helperText}
    >
      {selectOptions.map((selectOption, i) => (
        <option
          key={i}
          value={
            parentKeyName && childKeyName
              ? selectOption[parentKeyName][childKeyName]
              : parentKeyName
              ? selectOption[parentKeyName]
              : selectOption
          }
        >
          {parentKeyName && childKeyName
            ? selectOption[parentKeyName][childKeyName]
            : parentKeyName
            ? selectOption[parentKeyName]
            : selectOption}
        </option>
      ))}
    </TextField>
  );
}
