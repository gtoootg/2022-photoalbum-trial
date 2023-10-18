import { SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

export const MgText = ({
  content,
  variant,
  className,
  sx,
  color,
}: TextProps) => {
  return (
    <Typography className={className} variant={variant} sx={sx} color={color}>
      {content}
    </Typography>
  );
};

interface TextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit";

  content: ReactNode;
  className?: string;
  sx?: SxProps;
  color?: string;
}
