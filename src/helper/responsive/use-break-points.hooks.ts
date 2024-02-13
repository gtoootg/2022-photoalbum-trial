import { useTheme } from "@mui/system";
import { useMemo } from "react";
import { useMediaQuery } from "@mui/material";

export const useBreakPoints = () => {
  const theme = useTheme();

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isDownXl = useMediaQuery(theme.breakpoints.down("xl"));

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  return useMemo(() => {
    return {
      isDownSm,
      isDownMd,
      isDownLg,
      isUpSm,
      isUpMd,
      isUpLg,
      isDownXl,
    };
  }, [theme, isDownSm, isDownMd, isDownLg, isUpSm, isUpMd, isUpLg, isDownXl]);
};

export const useCurrentWidth = () => {
  const { isDownSm, isDownMd, isDownLg, isDownXl } = useBreakPoints();

  return useMemo(() => {
    if (isDownSm) {
      return "xs";
    }
    if (isDownMd) {
      return "sm";
    }
    if (isDownLg) {
      return "md";
    }
    if (isDownXl) {
      return "lg";
    }
    return "xl";
  }, [isDownSm, isDownMd, isDownLg, isDownXl]);
};
