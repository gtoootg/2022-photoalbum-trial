import Image from "next/image";
import { HeroProps } from "./Hero.types";
import { MgText } from "../text/MgText";
import { ImageTransition } from "../image-transition/ImageTransition";
import { HeroImageStyled, HeroRootStyled, HeroTextStyled } from "./Hero.styled";
import { Typography } from "@mui/material";

export const Hero = ({ images, title, caption }: HeroProps) => {
  if (!images || images.length === 0) {
    return <></>;
  }

  if (images.length > 1) {
    return (
      <HeroRootStyled>
        <HeroImageStyled>
          <ImageTransition images={images} />
        </HeroImageStyled>
        <HeroTextStyled>
          <Typography variant={"h1"}>{title}</Typography>
          <Typography variant={"h3"}>{caption}</Typography>
        </HeroTextStyled>
      </HeroRootStyled>
    );
  }

  return (
    <HeroRootStyled>
      <HeroImageStyled>
        <Image
          width={3}
          height={2}
          layout="responsive"
          src={images[0]}
          alt="image"
        />
      </HeroImageStyled>
      <HeroTextStyled>
        <MgText variant={"h1"} content={title} />
        <MgText variant={"h3"} content={caption} />
      </HeroTextStyled>
    </HeroRootStyled>
  );
};
