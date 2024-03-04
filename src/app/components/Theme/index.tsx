import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeProps {
  children: ReactNode;
}

// Define styles using makeStyles
const mainTheme = createTheme({
    palette: {
      primary: {
        main: "#29b692",
      },
      secondary: {
        main: "#0f344a",
      },
    },
  });

const Theme: React.FC<ThemeProps> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;