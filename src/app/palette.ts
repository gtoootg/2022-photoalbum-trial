import { PaletteOptions } from "@mui/material";

export interface ColorPalette {
  green: {
    main: string;
  };
  blue: {
    main: string;
  };
  orange: {
    main: string;
  };
}

export const palette: PaletteOptions & { color: ColorPalette } = {
  background: {
    paper: "#F8F8FF",
  },
  grey: {
    "200": "#F6F6F6",
    "300": "#ECECEC",
    "400": "#D8D8D8",
    "500": "#989898",
    "600": "#666666",
    "700": "#333333",
  },
  common: {
    black: "#000000",
    white: "#ffffff",
  },

  color: {
    green: {
      main: "#7ad87a",
    },
    blue: {
      main: "#3c8fe1",
    },
    orange: {
      main: "#de5c45",
    },
  },
};
