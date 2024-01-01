import { Box, styled } from "@mui/material";
import Image from "next/image";
export const PreviewImageBoxStyled = styled(Box, {
  shouldForwardProp: (props) => props !== "opacity",
})<{ opacity?: string }>(({ opacity }) => ({
  transition: "0.3s",
  opacity: opacity ? opacity : "1",
}));

export const PreviewImageStyled = styled(Image)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  overflow: "hidden",
}));
