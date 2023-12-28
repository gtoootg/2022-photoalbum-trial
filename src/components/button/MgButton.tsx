import { Button } from "@mui/material";
import React from "react";
import { MgText } from "../text/MgText";
import { MgLink } from "../link/MgLink";
import { MgButtonProps } from "./MgButton.types";

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
  labelColor,
}: MgButtonProps) => {
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
          color={labelColor}
          href={link}
          children={<MgText content={text} variant={"body1"} />}
        />
      ) : (
        <MgText content={text} variant={"body1"} color={labelColor} />
      )}
    </Button>
  );
};
