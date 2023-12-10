import { Button, SvgIconProps } from "@mui/material";
import React, { MouseEventHandler } from "react";
import { MgText } from "../text/MgText";
import Link from "next/link";
import classes from "./CommonButton.module.scss";
import { MgLink } from "../link/MgLink";
import { OverridableStringUnion } from "@mui/types";
import { ButtonPropsColorOverrides } from "@mui/material/Button/Button";

interface CommonButtonProps {
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
}

export const MgButton = ({
  variant,
  onClick,
  text,
  startIcon,
  endIcon,
  className,
  link,
  disabled,
  color,
}: CommonButtonProps) => {
  return (
    <Button
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
      color={color || "primary"}
    >
      {link ? (
        <MgLink
          href={link}
          children={<MgText content={text} variant={"body1"} />}
        />
      ) : (
        <MgText content={text} variant={"body1"} />
      )}
    </Button>
  );
};
