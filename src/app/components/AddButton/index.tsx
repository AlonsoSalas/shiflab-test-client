import React from "react";
import Button from "@mui/material/Button";

interface AddButtonProps {
  onClick: () => void;
  buttonText: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, buttonText }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "10px",
      }}
    >
      <Button variant="contained" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default AddButton;
