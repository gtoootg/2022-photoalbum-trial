import style from "./Hero.module.scss";
import Image from "next/image";
import { HeroProps } from "./Hero.types";
import { MgText } from "../text/MgText";
import { ImageTransition } from "../image-transition/ImageTransition";

export const Hero = ({
  image,
  imageGroupForTransition,
  title,
  caption,
}: HeroProps) => {
  if (!image && !imageGroupForTransition) {
    return <></>;
  }

  if (imageGroupForTransition) {
    return (
      <div className={style.hero}>
        <div className={style.hero_image_wrapper}>
          <ImageTransition
            images={imageGroupForTransition}
            className={style.hero_image}
          />
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
          src={image}
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
