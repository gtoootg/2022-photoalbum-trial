import { Chip, SvgIconProps } from "@mui/material";
import styles from "./ClickableChip.module.scss";
interface ClickableChipProps {
  label: string;
  onClick?: () => void;
  icon?: React.ReactElement<SvgIconProps>;
  color?: string;
}

export const ClickableChip = ({
  label,
  onClick,
  icon,
  color,
}: ClickableChipProps) => {
  return (
    <Chip
      label={label}
      onClick={onClick}
      icon={icon}
      color={color}
      className={styles[`${color}`]}
    />
  );
};
