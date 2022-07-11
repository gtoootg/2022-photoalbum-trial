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
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
