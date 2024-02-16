import { Button, Link, SvgIconProps } from "@mui/material";
import React from "react";
import { Text } from "../text/Text";

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
      data-testid={"commonButton"}
      variant={variant}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
    >
      {link ? (
        <Link href={link} variant={"body1"} color="inherit" underline="none">
          {text}
        </Link>
      ) : (
        <Text content={text} variant={"body1"} />
      )}
    </Button>
  );
};
