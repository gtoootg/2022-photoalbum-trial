import { Button, SvgIconProps } from "@mui/material";
import React from "react";

interface CommonButtonProps {
  onClick: () => void;
  variant: "text" | "contained" | "outlined";
  text: string;

  startIcon?: React.ReactElement<SvgIconProps>;
  endIcon?: React.ReactElement<SvgIconProps>;
  className?: string;
}

export const CommonButton = ({
  variant,
  onClick,
  text,
  startIcon,
  endIcon,
  className,
}: CommonButtonProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
    >
      {text}
    </Button>
  );
};
