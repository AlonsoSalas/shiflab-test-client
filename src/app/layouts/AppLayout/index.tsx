import React, { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import LeftMenu from "../../components/LeftMenu";
import Header from "../../components/Header";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Header
        sx={{ position: "fixed", top: 0, zIndex: 1000, width: "100%" , paddingLeft: '150px'}}
      />
      <Box
        sx={{
          position: "fixed",
          top: "64px",
          bottom: 0,
          width: "220px",
          zIndex: 999,
        }}
      >
        <LeftMenu />
      </Box>
      <Box sx={{ marginLeft: "220px", paddingTop: "64px" }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};

export default AppLayout;
