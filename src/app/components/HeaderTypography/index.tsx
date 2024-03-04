import React from "react";
import { Typography } from "@mui/material";

interface TypographyProps {
  children: React.ReactNode;
  sx?: any; // Add custom style prop
}

const HeaderTypography: React.FC<TypographyProps> = ({ children, sx }) => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="#/"
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
        ...sx, // Apply custom styles
      }}
    >
      {children}
    </Typography>
  );
};

export default HeaderTypography;