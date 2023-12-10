import { MgButton } from "../../button/MgButton";
import classes from "../Header.module.scss";
import React, { useCallback, useState } from "react";
import { useTranslation } from "next-i18next";
import { useAuthUserId } from "../../../app/auth/state/use-auth.reactive-vars";
import { useGetUser } from "../../../api/user/use-get-user.hooks";

export const HeaderUserMenu = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const { data } = useGetUser();

  const userName = data?.username;

  if (!userName) {
    return null;
  }

  return (
    <>
      <MgButton
        className={classes.header_container_navigation_element}
        variant={"text"}
        text={userName}
        onClick={handleOpen}
      />
    </>
  );
};
