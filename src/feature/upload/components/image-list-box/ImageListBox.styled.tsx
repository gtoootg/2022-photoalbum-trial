import ImageList from "@mui/material/ImageList";
import { styled } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageListBoxStyled = styled(ImageList)(() => ({
  width: "100%",
  height: "500px",
  margin: "0 auto",
}));

export const ImageListItemStyled = styled(ImageListItem, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  margin: theme.spacing(1),
  aspectRatio: "3/2",
  transition: "0.3s",
  borderRadius: theme.spacing(1),
  opacity: isSelected ? "1" : "0.6",
}));
