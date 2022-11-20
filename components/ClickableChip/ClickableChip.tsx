import { Chip, SvgIconProps } from "@mui/material";
import { CSSProperties } from "react";
import styles from "./ClickableChip.module.scss";
interface ClickableChipProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactElement<SvgIconProps>;
  color?: string;
  rootStyles?: CSSProperties;
}

export const ClickableChip = ({
  label,
  onClick,
  icon,
  color,
  rootStyles,
}: ClickableChipProps) => {
  return (
    <div style={rootStyles}>
      <Chip
        label={label}
        onClick={onClick}
        icon={icon}
        className={styles[`${color}`]}
      />
    </div>
  );
};
