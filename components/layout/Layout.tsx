import { Container } from "@mui/material";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import Header from "../header/Header";
import { Hero } from "../hero/Hero";
import { HeroProps } from "../hero/Hero.types";

function Layout(props: {
  children:
    | boolean
    | ReactFragment
    | ReactPortal
    | null
    | undefined
    | ReactChild;
  heroProps?: HeroProps;
}) {
  return (
    <div>
      <Header />
      {props.heroProps && <Hero {...props.heroProps} />}
      <Container maxWidth="lg" style={{ border: "solid red" }}>
        <main>{props.children}</main>
      </Container>
    </div>
  );
}

export default Layout;

export const getLayout = (childlen, { pageProps }) => {
  return <Layout heroProps={pageProps?.heroProps}>{childlen}</Layout>;
};
