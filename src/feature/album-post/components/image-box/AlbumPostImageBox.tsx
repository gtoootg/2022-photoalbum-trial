import { AlbumPostImageBoxProps } from "./AlbumPostImageBox.types";
import ImageSlider from "../../../../components/image-slider/ImageSlider";
import { useGetAlbumPostData } from "../../hooks/use-get-album-post.hooks";
import React from "react";
import { Box } from "@mui/material";
import { AlbumPostImageBoxStyled } from "./AlbumPostImageBox.styled";
import { useAlbumPostImageArrowIconConfig } from "./hooks/use-album-post-image-arrow-icon.hook";

export const AlbumPostImageBox = ({
  indexOfMainImage,
  handleClickSubImage,
}: AlbumPostImageBoxProps) => {
  const { imageSrcs } = useGetAlbumPostData();
  const iconConfig = useAlbumPostImageArrowIconConfig();

  return (
    <AlbumPostImageBoxStyled
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box maxWidth={"lg"} mt={4} mb={4}>
        <ImageSlider
          arrowIconProps={iconConfig}
          indexOfMainImage={indexOfMainImage}
          handleClickSubImage={handleClickSubImage}
          imagesSrc={imageSrcs || []}
        />
      </Box>
    </AlbumPostImageBoxStyled>
  );
};
