import { Box, Container } from "@mui/material";
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
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mb={10}
    >
      {header && <Header />}
      {heroProps && <Hero {...heroProps} />}
      {children}
    </Box>
  );
}

export default Layout;
