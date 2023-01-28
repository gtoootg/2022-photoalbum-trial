import { Grid } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./AlbumPostImageSlider.module.scss";

interface AlbumPostImageSliderProps {
  imagesSrc: string[];
  indexOfMainImage: number;
  handleClickSubImage: (index: number) => void;
}

const AlbumPostImageSlider = ({
  imagesSrc,
  handleClickSubImage,
  indexOfMainImage,
}: AlbumPostImageSliderProps) => {
  const mainImageToRender = imagesSrc[indexOfMainImage];

  return (
    <Grid container>
      <MainImage imageSrc={mainImageToRender} />
      <SubImageGroup
        subImagesSrc={imagesSrc}
        indexOfMainImage={indexOfMainImage}
        handleClickSubImage={handleClickSubImage}
      />
    </Grid>
  );
};

const MainImage = ({ imageSrc }) => {
  return (
    <Grid item xs={12}>
      <div className={styles.mainImage}>
        <Image
          width={3}
          height={2}
          layout="responsive"
          objectFit="contain"
          src={imageSrc}
          alt="image"
        />
      </div>
    </Grid>
  );
};

const SubImageGroup = ({
  subImagesSrc,
  indexOfMainImage,
  handleClickSubImage,
}) => {
  return (
    <Grid
      item
      container
      xs={12}
      spacing={2}
      className={styles.subImageGroup}
      justifyContent="center"
    >
      {subImagesSrc.map((imageSrc, index) => {
        return (
          <>
            <Grid item xs={2}>
              <div
                className={styles.subImageGroup_image}
                key={index}
                style={{
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
              </div>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
};

export default AlbumPostImageSlider;
