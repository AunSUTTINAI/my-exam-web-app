import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";

function CustomSlider({
  label,
  defaultLimit = 500,
  step = 100,
  min = 100,
  max = 10000,
  onChange,
}) {
  const [limit, setLimit] = useState(defaultLimit);

  const handleChange = (event, newValue) => {
    setLimit(newValue);
  };

  const handleCommit = (event, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box>
      {label && (
        <Typography variant="subtitle2" gutterBottom>
          {label}
        </Typography>
      )}
      <Slider
        value={limit}
        valueLabelDisplay="on"
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        step={step}
        min={min}
        max={max}
        marks={[
          { value: min, label: min },
          { value: defaultLimit, label: "Default" },
          { value: max, label: max },
        ]}
        sx={{
          mt: label ? 1.4 : 2,
          color: "primary.main",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 16,
            height: 16,
            boxShadow: 1,
            "&:hover, &.Mui-focusVisible": { boxShadow: 2 },
          },
          "& .MuiSlider-track": { border: "none" },
          "& .MuiSlider-rail": { opacity: 0.35 },
          "& .MuiSlider-valueLabel": {
            lineHeight: 1,
            fontSize: 12,
            padding: "4px 8px",
            color: "#fff",
            backgroundColor: "primary.main",
            borderRadius: 12,
            "&:before": { display: "none" },
            "&::after": {
              content: '""',
              position: "absolute",
              left: "50%",
              bottom: -4,
              width: 8,
              height: 8,
              backgroundColor: "inherit",
              transform: "translateX(-50%) rotate(45deg)",
              borderRadius: "1px",
            },
          },
        }}
      />
    </Box>
  );
}

export default CustomSlider;
