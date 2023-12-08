import classes from "./Header.module.scss";
import { useTranslation } from "next-i18next";
import { DropDownMenu } from "../drop-down-menu/DropDownMenu";
import { CommonButton } from "../button/CommonButton";
import UploadIcon from "@mui/icons-material/Upload";
import { useGetAlbumPosts } from "../../api/album-posts/use-get-album-posts.hooks";
import { useGetCommonCountries } from "../../api/common/countries/use-get-common-countries.hooks";
import Box from "@mui/material/Box";
import React from "react";
import {
  useCategoriesFromAlbumPostsForHeader,
  useCountriesFromAlbumPostsForHeader,
} from "./hooks/use-data-for-header.hooks";
import { HeaderLoginMenu } from "./auth/HeaderLoginMenu";
import { useAuthAccessToken } from "../../app/auth/state/use-auth.reactive-vars";

export default function Header() {
  const { t } = useTranslation();
  const [accessToken] = useAuthAccessToken();
  const countryMenu = useCountriesFromAlbumPostsForHeader();
  const categoryMenu = useCategoriesFromAlbumPostsForHeader();

  return (
    <Box className={classes.header}>
      <Box className={classes.header_container}>
        <Box className={classes.header_container_brand}>
          <h1>Michihiro Goto`s Gallery</h1>
        </Box>
        <Box className={classes.header_container_navigation}>
          {accessToken && (
            <CommonButton
              className={classes.header_container_navigation_element}
              startIcon={<UploadIcon />}
              variant={"contained"}
              text={t("header.navigation.upload")}
              link={"/upload"}
            />
          )}
          <CommonButton
            className={classes.header_container_navigation_element}
            variant={"text"}
            text={t("header.navigation.top")}
            link={"/"}
          />
          <DropDownMenu
            classNameForLabelColor={classes.header_container_navigation_element}
            label={t("header.navigation.country")}
            menuItems={countryMenu || []}
          />
          <DropDownMenu
            classNameForLabelColor={classes.header_container_navigation_element}
            label={t("header.navigation.category")}
            menuItems={categoryMenu || []}
          />
          <CommonButton
            className={classes.header_container_navigation_element}
            variant={"text"}
            text={t("header.navigation.map")}
            link={"/map"}
          />

          <HeaderLoginMenu />
        </Box>
      </Box>
    </Box>
  );
}
