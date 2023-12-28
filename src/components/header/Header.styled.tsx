import { Box, styled } from "@mui/material";

export const HeaderRootStyled = styled(Box)(({ theme }) => ({
  backgroundColor: "#2a3139",
}));

export const HeaderContainerStyled = styled(Box)(({ theme }) => ({
  color: "white",
}));

export const HeaderNavigationStyled = styled(Box)(({ theme }) => ({
  textDecoration: "none",
  gap: theme.spacing(2),
}));
