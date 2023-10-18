import classes from "./Header.module.scss";
import { useTranslation } from "next-i18next";
import { DropDownMenu } from "../drop-down-menu/DropDownMenu";
import { CommonButton } from "../button/CommonButton";
import UploadIcon from "@mui/icons-material/Upload";
import { getCountryDataOfAllUploadedPosts } from "../../helper/ui/UiHelperFunction.helper";
import { useGetAlbumPosts } from "../../api/album-posts/use-get-album-posts.hooks";
import { useGetCommonCountries } from "../../api/common/countries/use-get-common-countries.hooks";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { Link } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation();

  const { data: countries } = useGetCommonCountries();
  const { data: uploadedPosts } = useGetAlbumPosts();

  const countryDataOfAllUploadedPosts = getCountryDataOfAllUploadedPosts(
    uploadedPosts,
    countries
  );

  const countriesLabel =
    countryDataOfAllUploadedPosts &&
    countryDataOfAllUploadedPosts.map((country) => ({
      label: country?.name.common,
      link: `/country/${country?.ccn3}`,
    }));

  return (
    <Box className={classes.header}>
      <Box className={classes.header_container}>
        <Box className={classes.header_container_brand}>
          <h1>Michihiro Goto`s Gallery</h1>
        </Box>
        <Box className={classes.header_container_navigation}>
          <CommonButton
            className={classes.header_container_navigation_element}
            variant={"text"}
            text={t("header.navigation.top")}
            onClick={() => router.push("/")}
          />
          <DropDownMenu
            classNameForLabelColor={classes.header_container_navigation_element}
            label={t("header.navigation.country")}
            menuItems={countriesLabel ? countriesLabel : []}
          />
          <DropDownMenu
            classNameForLabelColor={classes.header_container_navigation_element}
            label={t("header.navigation.category")}
            menuItems={[]}
          />
          <CommonButton
            className={classes.header_container_navigation_element}
            variant={"text"}
            text={t("header.navigation.map")}
            link={"/map"}
            // onClick={() => router.push("/map")}
          />
          <CommonButton
            className={classes.header_container_navigation_element}
            startIcon={<UploadIcon />}
            variant={"contained"}
            text={t("header.navigation.upload")}
            onClick={() => router.push("/upload")}
          />
        </Box>
      </Box>
    </Box>
  );
}
