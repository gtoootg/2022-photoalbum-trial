import { Container } from "@mui/material";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import Header from "../header/Header";
import { Hero } from "../hero/Hero";
import { HeroProps } from "../hero/Hero.types";

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
    <div>
      {header && <Header />}
      {heroProps && <Hero {...heroProps} />}
      <Container maxWidth="xl">
        <main>{children}</main>
      </Container>
    </div>
  );
}

export default Layout;
