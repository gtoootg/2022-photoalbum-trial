import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { MgLink } from "../link/MgLink";
import { MgText } from "../text/MgText";

interface DropDownMenuProps<DropDownMenuItemProps> {
  label: string;
  menuItems: (DropDownMenuItemProps & { label: string; link?: string })[];
  classNameForLabelColor?: string;
  handleClickMenuItem?: (value: DropDownMenuItemProps) => void;
  linkWithoutParam?: string;
}

export const DropDownMenu = <T extends any>({
  label,
  menuItems,
  classNameForLabelColor,
  handleClickMenuItem,
}: DropDownMenuProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <h3 className={classNameForLabelColor}>{label}</h3>
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
        {menuItems.map((item, i) => {
          return (
            <MenuItem
              key={i}
              onClick={() => {
                handleClickMenuItem && handleClickMenuItem(item);
              }}
            >
              {item.link ? (
                <MgLink href={item.link}>
                  <MgText content={item.label} />
                </MgLink>
              ) : (
                <MgText content={item.label} />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
