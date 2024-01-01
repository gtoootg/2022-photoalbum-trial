import { Box, styled } from "@mui/material";

export const LayoutStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  minHeight: "100vh",
  paddingBottom: "50px",
}));
