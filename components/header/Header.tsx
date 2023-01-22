import classes from "./Header.module.scss";
import { useTranslation } from "next-i18next";
import { DropDownMenu } from "../drop-down-menu/DropDownMenu";
import { CommonButton } from "../button/CommonButton";
import UploadIcon from "@mui/icons-material/Upload";
import { useContext, useEffect, useState } from "react";
import { UploadingDataProps } from "../../feature/upload/Upload.types";
import { useGetCountries } from "../../feature/upload/UploadBody";
import { getCountryDataOfAllUploadedPosts } from "../../helper/ui/UiHelperFunction.helper";
import { uploadedPostsContext } from "../../pages/_app";
import { useGetUploadedPosts } from "../../feature/home/HomeBody";

export default function Header() {
  const { t } = useTranslation();

  const [countries, setCountries] = useState();
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  // useGetUploadedPosts(setUploadedPosts, uploadedPosts);
  useGetCountries(setCountries);

  useEffect(() => {
    console.log(uploadedPosts);
    console.log(getCountryDataOfAllUploadedPosts(uploadedPosts, countries));
  }, [countries, uploadedPosts]);

  return (
    <div className={classes.header}>
      <div className={classes.header_container}>
        <div className={classes.header_container_brand}>
          <h1>Michihiro Goto`s Gallery</h1>
        </div>
        <div className={classes.header_container_navigation}>
          <CommonButton
            className={classes.header_container_navigation_element}
            variant={"text"}
            text={t("header.navigation.top")}
            link={"/"}
          />
          <DropDownMenu
            classNameForLabelColor={classes.header_container_navigation_element}
            label={t("header.navigation.country")}
            menuItems={[{ label: "japan" }, { label: "germany" }]}
          />
          <DropDownMenu
            classNameForLabelColor={classes.header_container_navigation_element}
            label={t("header.navigation.category")}
            menuItems={[{ label: "japan" }, { label: "germany" }]}
          />
          <CommonButton
            className={classes.header_container_navigation_element}
            startIcon={<UploadIcon />}
            variant={"contained"}
            text={t("header.navigation.upload")}
            link={"/upload"}
          />
        </div>
      </div>
    </div>
  );
}
