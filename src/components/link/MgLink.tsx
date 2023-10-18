import Link from "next/link";
import classes from "./MgLink.module.scss";
import { LinkProps } from "next/dist/client/link";
import { ReactNode } from "react";

interface MgLinkProps extends LinkProps {
  children: ReactNode;
}

export const MgLink = ({ children, ...restProps }: MgLinkProps) => {
  return (
    <Link className={classes.textLink} {...restProps}>
      {children}
    </Link>
  );
};
