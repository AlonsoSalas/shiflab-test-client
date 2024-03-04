import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";
import { MenuList, MenuItem, ListItemText } from "@mui/material";
import HeaderTypography from "../HeaderTypography";
import { LEFT_MENU_ITEMS } from "../../constants/index";

interface LeftMenuProps {
  sx?: any; // Add custom style prop
}

const LeftMenuContainer = styled("nav")({
    width: "200px",
    padding: "20px 0",
    position: "fixed",
    left: 0,
    top: '64px',
    height: "calc(100% - 64px)",
    overflowY: "auto",
    backgroundColor: '#f0f0f0',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
  });
  
  const LeftMenu: React.FC<LeftMenuProps> = ({ sx }) => {
    return (
      <LeftMenuContainer sx={sx}>
        <MenuList>
          {LEFT_MENU_ITEMS.map((item, index) => (
            <MenuItem key={index} component={NavLink} to={item.path}>
              <ListItemText>
                <HeaderTypography>{item.label}</HeaderTypography>
              </ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </LeftMenuContainer>
    );
  };
  
  export default LeftMenu;