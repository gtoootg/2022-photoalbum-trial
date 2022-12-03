import LandscapeIcon from "@mui/icons-material/Landscape";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LocationCityIcon from "@mui/icons-material/LocationCity";

export const IconFactory = ({ iconType }) => {
  const iconRootStyles = {
    sx: { paddingLeft: "8px", fontSize: "2rem" },
  };

  if (iconType === Category.NATURE) {
    return <LandscapeIcon {...iconRootStyles} />;
  }

  if (iconType === Category.TRAFFIC) {
    return <FlightTakeoffIcon {...iconRootStyles} />;
  }

  if (iconType === Category.NIGHT_VIEW) {
    return <DarkModeIcon {...iconRootStyles} />;
  }

  if (iconType === Category.CITY_VIEW) {
    return <LocationCityIcon {...iconRootStyles} />;
  }
};

export enum Category {
  NATURE,
  NIGHT_VIEW,
  TRAFFIC,
  CITY_VIEW,
}
