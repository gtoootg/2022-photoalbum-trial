import React, { MouseEventHandler } from "react";
import { SvgIconProps } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { ButtonPropsColorOverrides } from "@mui/material/Button/Button";

export interface MgButtonProps {
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  variant: "text" | "contained" | "outlined";
  text: string;
  startIcon?: React.ReactElement<SvgIconProps>;
  endIcon?: React.ReactElement<SvgIconProps>;
  className?: string;
  link?: string;
  disabled?: boolean;
  color?: OverridableStringUnion<
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning",
    ButtonPropsColorOverrides
  >;
  labelColor?: string;
}
