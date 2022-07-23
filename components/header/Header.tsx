import classes from "./Header.module.scss";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useState } from "react";

function RegionMenu({ anchorEl, handleClick, handleClose }: any) {
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <h3>{t("header.navigation.region")}</h3>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const { route, locale } = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  interface navigationItems {
    text: string | JSX.Element;
  }

  return (
    <div className={classes.header}>
      <div className={classes.header_container}>
        <div className={classes.header_container_brand}>
          <h1>Michihiro Goto`s Gallery</h1>
        </div>
        <div className={classes.header_container_navigation}>
          <Button>
            <Link href="/">
              <h3>{t("header.navigation.top")}</h3>
            </Link>
          </Button>
          <Button variant="contained">
            <Link href="/upload">
              <h3>{t("header.navigation.upload")}</h3>
            </Link>
          </Button>
          <RegionMenu
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
