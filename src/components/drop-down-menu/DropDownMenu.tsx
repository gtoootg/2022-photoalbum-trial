import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { MgLink } from "../link/MgLink";
import { MgText } from "../text/MgText";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

interface DropDownMenuProps<DropDownMenuItemProps> {
  label: string;
  menuItems: (DropDownMenuItemProps & { label: string; link?: string })[];
  handleClickMenuItem?: (value: DropDownMenuItemProps) => void;
  linkWithoutParam?: string;
  color?: string;
}

export const DropDownMenu = <T extends any>({
  label,
  menuItems,
  handleClickMenuItem,
  color,
}: DropDownMenuProps<T>) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography color={color || theme.palette.common.white}>
          {label}
        </Typography>
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
                  <MgText
                    content={item.label}
                    color={theme.palette.common.black}
                  />
                </MgLink>
              ) : (
                <MgText content={item.label} />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};
