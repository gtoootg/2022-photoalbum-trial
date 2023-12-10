import style from "./Hero.module.scss";
import Image from "next/image";
import { HeroProps } from "./Hero.types";
import { MgText } from "../text/MgText";
import { ImageTransition } from "../image-transition/ImageTransition";

export const Hero = ({ images, title, caption }: HeroProps) => {
  if (!images || images.length === 0) {
    return <></>;
  }

  if (images.length > 1) {
    return (
      <div className={style.hero}>
        <div className={style.hero_image_wrapper}>
          <ImageTransition images={images} className={style.hero_image} />
        </div>
        <div className={style.hero_text}>
          <MgText variant={"h1"} content={title} />
          <MgText variant={"h3"} content={caption} />
        </div>
      </div>
    );
  }

  return (
    <div className={style.hero}>
      <div className={style.hero_image_wrapper}>
        <Image
          width={3}
          height={2}
          layout="responsive"
          src={images[0]}
          alt="image"
          className={style.image}
        />
      </div>
      <div className={style.hero_text}>
        <MgText variant={"h1"} content={title} />
        <MgText variant={"h3"} content={caption} />
      </div>
    </div>
  );
};
