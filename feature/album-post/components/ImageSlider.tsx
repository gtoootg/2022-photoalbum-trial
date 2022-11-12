import Image from "next/image";
import { useState } from "react";

const ImageSlider = ({ imagesSrc }) => {
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);

  const mainImageToRender = imagesSrc[indexOfMainImage];

  return (
    <>
      <MainImage imageSrc={mainImageToRender} />
      <SubImageGroup
        subImagesSrc={imagesSrc}
        indexOfMainImage={indexOfMainImage}
        setIndexOfMainImage={setIndexOfMainImage}
      />
    </>
  );
};

const MainImage = ({ imageSrc }) => {
  return (
    <div
      style={{
        width: "500px",
        position: "relative",
        border: "blue solid",
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
};

const SubImageGroup = ({
  subImagesSrc,
  indexOfMainImage,
  setIndexOfMainImage,
}) => {
  return (
    <div>
      {subImagesSrc.map((imageSrc, index) => {
        <div
          style={{
            width: "30px",
            position: "relative",
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
        </div>;
      })}
    </div>
  );
};

export default ImageSlider;
