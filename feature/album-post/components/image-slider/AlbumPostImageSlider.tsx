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
    <div className={styles.imageSlider}>
      <MainImage imageSrc={mainImageToRender} />
      <SubImageGroup
        subImagesSrc={imagesSrc}
        indexOfMainImage={indexOfMainImage}
        handleClickSubImage={handleClickSubImage}
      />
    </div>
  );
};

const MainImage = ({ imageSrc }) => {
  return (
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
  );
};

const SubImageGroup = ({
  subImagesSrc,
  indexOfMainImage,
  handleClickSubImage,
}) => {
  return (
    <div className={styles.subImageGroup}>
      {subImagesSrc.map((imageSrc, index) => {
        return (
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
        );
      })}
    </div>
  );
};

export default AlbumPostImageSlider;
