import { Button, SvgIconProps } from "@mui/material";
import React from "react";
import { MgText } from "../text/MgText";
import Link from "next/link";
import classes from "./CommonButton.module.scss";
import { MgLink } from "../link/MgLink";

interface CommonButtonProps {
  onClick?: () => void;
  variant: "text" | "contained" | "outlined";
  text: string;

  startIcon?: React.ReactElement<SvgIconProps>;
  endIcon?: React.ReactElement<SvgIconProps>;
  className?: string;
  link?: string;
  disabled?:boolean
  color?:string
}

export const CommonButton = ({
  variant,
  onClick,
  text,
  startIcon,
  endIcon,
  className,
  link,
    disabled,
    color
}: CommonButtonProps) => {
  return (
    <Button
        disabled={disabled}
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
        color={color}
    >
      {link ? (
        <MgLink href={link} children={text} />
      ) : (
        <MgText content={text} variant={"body1"} />
      )}
    </Button>
  );
};
