import { Grid } from "@mui/material";
import Image from "next/image";
import styles from "./ImageSlider.module.scss";
import { useState } from "react";

interface ImageSliderProps {
  imagesSrc: string[];
  indexOfMainImage?: number;
  handleClickSubImage?: (index: number) => void;
}

const ImageSlider = ({
  imagesSrc,
  handleClickSubImage,
  indexOfMainImage,
}: ImageSliderProps) => {
  const [defaultIndexOfMainImage, setDefaultIndexOfMainImage] = useState(0);
  const mainImageToRender = indexOfMainImage
    ? imagesSrc[indexOfMainImage]
    : imagesSrc[defaultIndexOfMainImage];

  return (
    <Grid container>
      <MainImage imageSrc={mainImageToRender} />
      <SubImageGroup
        subImagesSrc={imagesSrc}
        indexOfMainImage={
          indexOfMainImage ? indexOfMainImage : defaultIndexOfMainImage
        }
        handleClickSubImage={(i) => {
          handleClickSubImage && handleClickSubImage(i);
          setDefaultIndexOfMainImage(i);
        }}
      />
    </Grid>
  );
};

const MainImage = ({ imageSrc }: { imageSrc: string }) => {
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
}: {
  subImagesSrc: string[];
  indexOfMainImage: number;
  handleClickSubImage: (i: number) => void;
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

export default ImageSlider;
