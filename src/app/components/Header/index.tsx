import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import HeaderTypography from "../HeaderTypography";
import { HEADER_TITLE } from "../../constants";

interface HeaderProps {
  sx?: any; 
}

const Header: React.FC<HeaderProps> = ({ sx }) => {
    return (
      <AppBar position="static" sx={sx}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <HeaderTypography>{HEADER_TITLE}</HeaderTypography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };
  
  export default Header;