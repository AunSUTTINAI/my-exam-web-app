import React from "react";
import "./Loading.css";
import { Box } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <span className="loader" />
    </Box>
  );
}

export default Loading;
