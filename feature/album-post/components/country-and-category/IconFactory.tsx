import LandscapeIcon from "@mui/icons-material/Landscape";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LocationCityIcon from "@mui/icons-material/LocationCity";

export const IconFactory = (iconType) => {
  if (iconType === Category.NATURE) {
    return <LandscapeIcon />;
  }

  if (iconType === Category.TRAFFIC) {
    return <FlightTakeoffIcon />;
  }

  if (iconType === Category.NIGHT_VIEW) {
    return <DarkModeIcon />;
  }

  if (iconType === Category.CITY_VIEW) {
    return <LocationCityIcon />;
  }
};

export enum Category {
  NATURE,
  NIGHT_VIEW,
  TRAFFIC,
  CITY_VIEW,
}
