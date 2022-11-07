import { Container } from "@mui/material";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import Header from "../header/Header";

function Layout(props: {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" style={{ border: "solid red" }}>
        <main>{props.children}</main>
      </Container>
    </div>
  );
}

export default Layout;
