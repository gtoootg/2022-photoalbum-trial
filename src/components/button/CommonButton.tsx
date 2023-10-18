import { Button, SvgIconProps } from "@mui/material";
import React from "react";
import { MgText } from "../text/MgText";
import Link from "next/link";
import classes from "./CommonButton.module.scss";

interface CommonButtonProps {
  onClick?: () => void;
  variant: "text" | "contained" | "outlined";
  text: string;

  startIcon?: React.ReactElement<SvgIconProps>;
  endIcon?: React.ReactElement<SvgIconProps>;
  className?: string;
  link?: string;
}

export const CommonButton = ({
  variant,
  onClick,
  text,
  startIcon,
  endIcon,
  className,
  link,
}: CommonButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
    >
      {link ? (
        <Link href={link} className={classes.textLink}>
          {text}
        </Link>
      ) : (
        <MgText content={text} variant={"body1"} />
      )}
    </Button>
  );
};
