import { Box, styled } from "@mui/material";

export const AlbumPostGeneralInformationTextGroupStyled = styled(Box)(
  ({ theme }) => ({
    transition: "0.3s",
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  })
);

export const AlbumPostGeneralInformationEditTextGroupBoxStyled = styled(Box)(
  ({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
  })
);
