import { Box, Grid } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

interface ImageSliderProps {
  imagesSrc: string[];
  indexOfMainImage: number;
  handleClickSubImage?: (index: number) => void;
  arrowIconProps?: {
    onClickRight?: () => void;
    onClickLeft?: () => void;
    size: string;
    color: string;
  };
}

const ImageSlider = ({
  imagesSrc,
  handleClickSubImage,
  indexOfMainImage,
  arrowIconProps,
}: ImageSliderProps) => {
  const [defaultIndexOfMainImage, setDefaultIndexOfMainImage] = useState(0);
  const mainImageToRender =
    indexOfMainImage !== undefined
      ? imagesSrc[indexOfMainImage]
      : imagesSrc[defaultIndexOfMainImage];
  const { onClickRight, onClickLeft, size, color } = arrowIconProps || {};

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={2}
      >
        <ArrowLeftIcon
          onClick={onClickLeft}
          htmlColor={color}
          sx={{
            height: size,
            width: size,
            visibility: !onClickLeft ? "hidden" : undefined,
          }}
        />
        <MainImage imageSrc={mainImageToRender} />
        <ArrowRightIcon
          onClick={onClickRight}
          htmlColor={color}
          sx={{
            height: size,
            width: size,
            visibility: !onClickRight ? "hidden" : undefined,
          }}
        />
      </Box>
      <SubImageGroup
        subImagesSrc={imagesSrc}
        indexOfMainImage={
          indexOfMainImage !== undefined
            ? indexOfMainImage
            : defaultIndexOfMainImage
        }
        handleClickSubImage={(i) => {
          handleClickSubImage && handleClickSubImage(i);
          setDefaultIndexOfMainImage(i);
        }}
      />
    </Box>
  );
};

const MainImage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <Grid item xs={12}>
      <Image
        width={3}
        height={2}
        layout="responsive"
        objectFit="contain"
        src={imageSrc}
        alt="image"
      />
    </Grid>
  );
};

const SubImageGroup = ({
  subImagesSrc,
  indexOfMainImage,
  handleClickSubImage,
}: {
  subImagesSrc: string[];
  indexOfMainImage: number;
  handleClickSubImage: (i: number) => void;
}) => {
  return (
    <Grid item container xs={12} spacing={2} justifyContent="center">
      {subImagesSrc.map((imageSrc, index) => {
        return (
          <Grid item xs={2}>
            <Box
              mt={2}
              key={index}
              sx={{
                opacity: indexOfMainImage === index ? 1 : 0.6,
              }}
              onClick={() => {
                handleClickSubImage(index);
              }}
            >
              <Image
                width={3}
                height={2}
                layout="responsive"
                objectFit="contain"
                src={imageSrc}
                alt="image"
              />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ImageSlider;
