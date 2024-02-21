import Link from "next/link";
import { ReactNode } from "react";
import { styled } from "@mui/material";
import React from "react";
interface MgLinkProps {
  href: string;
  children: ReactNode;
  color?: string;
  onClick?: () => void;
}

const MgLinkStyled = styled(Link, {
  shouldForwardProp: (props) => props !== "color",
})<{ color?: string }>(({ color }) => ({
  textDecoration: "none",
  color: color ? color : "white",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const MgLink = ({ children, href, color, onClick }: MgLinkProps) => {
  return (
    <MgLinkStyled href={href} color={color} onClick={onClick}>
      {children}
    </MgLinkStyled>
  );
};
