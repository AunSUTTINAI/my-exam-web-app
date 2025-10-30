import React, { useState } from "react";
import { Box, IconButton, Paper } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

function CardPosition({ stylesCard, children }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          position: "absolute",
          top: (stylesCard?.top ?? 80) + 10,
          left: open
            ? (stylesCard?.left ?? 40) + (stylesCard?.width ?? 300) + 10
            : 10,
          zIndex: 1100,
          bgcolor: "rgba(0, 150, 136, 0.5)",
          boxShadow: 3,
          "&:hover": { bgcolor: "rgba(0, 150, 136, 1)" },
          transition: "all 0.3s ease",
        }}
      >
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      {open && (
        <Paper
          elevation={3}
          sx={{
            zIndex: 1000,
            position: "absolute",
            background: "rgba(255,255,255,0.5)",
            p: 2,
            borderRadius: 2,
            transition: "opacity 0.3s ease",
            ...stylesCard,
            width: {xs:300 , sm:380},
          }}
        >
          {children}
        </Paper>
      )}
    </>
  );
}

export default CardPosition;
