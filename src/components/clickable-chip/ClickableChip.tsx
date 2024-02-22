import { Chip, SvgIconProps } from "@mui/material";

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
      sx={{ backgroundColor: color }}
    />
  );
};
