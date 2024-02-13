import { Typography } from "@mui/material";
import React from "react";

export const Text = ({ content, variant, className }: TextProps) => {
  return (
    <Typography className={className} variant={variant}>
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

  content: string;
  className?: string;
}
