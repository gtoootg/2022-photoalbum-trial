import { Box, styled } from "@mui/material";

export const HeroRootStyled = styled(Box)(({}) => ({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  height: "600px",
}));

export const HeroImageStyled = styled(Box)(() => ({
  position: "absolute",
  bottom: "-200px",
  zIndex: "1",
  width: "100%",
}));

export const HeroTextStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  color: theme.palette.common.white,
  bottom: "-180px",
  zIndex: "2",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
