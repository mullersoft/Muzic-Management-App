// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
    },
    secondary: {
      main: "#03dac6",
    },
    background: {
      default: "#f6f6f6",
    },
    text: {
      primary: "#000000",
    },
  },
  spacing: (factor: number) => `${factor * 8}px`,
});

export default theme;
