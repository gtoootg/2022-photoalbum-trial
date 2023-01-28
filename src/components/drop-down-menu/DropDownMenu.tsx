import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Link from "next/link";

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
        {menuItems.map((item) => {
          return (
            <MenuItem
              onClick={() => {
                handleClickMenuItem(item);
              }}
            >
              {item.link ? (
                <Link href={item.link} color="inherit">
                  {item.label}
                </Link>
              ) : (
                <>{item.label}</>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
