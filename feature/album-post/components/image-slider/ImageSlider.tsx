import Image from "next/image";
import { useState } from "react";
import styles from "./ImageSlider.module.scss";

const ImageSlider = ({ imagesSrc }) => {
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);

  const mainImageToRender = imagesSrc[indexOfMainImage];

  return (
    <div className={styles.imageSlider}>
      <MainImage imageSrc={mainImageToRender} />
      <SubImageGroup
        subImagesSrc={imagesSrc}
        indexOfMainImage={indexOfMainImage}
        setIndexOfMainImage={setIndexOfMainImage}
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
  setIndexOfMainImage,
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
              setIndexOfMainImage(index);
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

export default ImageSlider;
