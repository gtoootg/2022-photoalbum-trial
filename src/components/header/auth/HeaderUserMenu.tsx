import { MgButton } from "../../button/MgButton";
import React, { useCallback, useState } from "react";
import { useGetAuthUser } from "../../../api/user/use-get-user.hooks";

export const HeaderUserMenu = () => {
  const [, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const { data } = useGetAuthUser();

  const userName = data?.username;

  if (!userName) {
    return null;
  }

  return <MgButton variant={"text"} text={userName} onClick={handleOpen} />;
};
