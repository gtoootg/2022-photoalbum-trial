import { ReactChild, ReactFragment, ReactPortal } from "react";
import Header from "../header/Header";
import { Hero } from "../hero/Hero";
import { HeroProps } from "../hero/Hero.types";
import { LayoutStyled } from "./Layout.styled";

function Layout({
  children,
  heroProps,
  header = true,
}: {
  children:
    | boolean
    | ReactFragment
    | ReactPortal
    | null
    | undefined
    | ReactChild;
  heroProps?: HeroProps;
  header?: boolean;
}) {
  return (
    <LayoutStyled
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      {header && <Header />}
      {heroProps && <Hero {...heroProps} />}
      {children}
    </LayoutStyled>
  );
}

export default Layout;
