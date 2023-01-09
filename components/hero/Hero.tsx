import style from "./Hero.module.scss";
import Image from "next/image";

export const Hero = ({ imageSrc }) => {
  return (
    <div className={style.hero}>
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
