import { useTranslation } from "next-i18next";
import { DropDownMenu } from "../drop-down-menu/DropDownMenu";
import { MgButton } from "../button/MgButton";
import UploadIcon from "@mui/icons-material/Upload";
import Box from "@mui/material/Box";
import React from "react";
import {
  useCategoriesFromAlbumPostsForHeader,
  useCountriesFromAlbumPostsForHeader,
} from "./hooks/use-data-for-header.hooks";
import { HeaderLoginMenu } from "./auth/HeaderLoginMenu";
import { useAuthAccessToken } from "../../app/auth/state/use-auth.reactive-vars";
import { HeaderUserMenu } from "./auth/HeaderUserMenu";
import {
  HeaderContainerStyled,
  HeaderNavigationStyled,
  HeaderRootStyled,
} from "./Header.styled";

export default function Header() {
  const { t } = useTranslation();
  const [accessToken] = useAuthAccessToken();
  const countryMenu = useCountriesFromAlbumPostsForHeader();
  const categoryMenu = useCategoriesFromAlbumPostsForHeader();

  return (
    <HeaderRootStyled
      width={1}
      height={96}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <HeaderContainerStyled
        width={1440}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box fontWeight={"bold"}>
          <h1>Michihiro Goto`s Gallery</h1>
        </Box>
        <HeaderNavigationStyled display={"flex"} alignItems={"center"}>
          {accessToken && (
            <MgButton
              startIcon={<UploadIcon />}
              variant={"contained"}
              text={t("header.navigation.upload")}
              link={"/upload"}
            />
          )}
          <MgButton
            variant={"text"}
            text={t("header.navigation.top")}
            link={"/"}
          />
          <DropDownMenu
            label={t("header.navigation.country")}
            menuItems={countryMenu || []}
          />
          <DropDownMenu
            label={t("header.navigation.category")}
            menuItems={categoryMenu || []}
          />
          <MgButton
            variant={"text"}
            text={t("header.navigation.map")}
            link={"/map"}
          />
          {accessToken ? <HeaderUserMenu /> : <HeaderLoginMenu />}
        </HeaderNavigationStyled>
      </HeaderContainerStyled>
    </HeaderRootStyled>
  );
}
