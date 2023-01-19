import style from "./Hero.module.scss";
import Image from "next/image";
import { HeroProps } from "./Hero.types";
import { Text } from "../text/Text";

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
    return <></>;
  }

  return (
    <div className={style.hero}>
      <Image
        className={style.hero_image}
        width={3}
        height={2}
        layout="responsive"
        objectFit="contain"
        src={image}
        alt="image"
      />
      <div className={style.hero_text}>
        <Text variant={"h1"} content={title} />
        <Text variant={"h3"} content={caption} />
      </div>
    </div>
  );
};
