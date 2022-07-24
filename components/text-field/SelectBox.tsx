import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

interface SelectBoxProps {
  selectOptions: any[];
  parentKeyName?: string;
  childKeyName?: string;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  helperText?: string;
}

export default function SelectBox({
  selectOptions,
  parentKeyName,
  childKeyName,
  handleChange,
  helperText,
}: SelectBoxProps) {
  return (
    <TextField
      id="outlined-select"
      select
      label="Native select"
      // value={currency}
      onChange={handleChange}
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
