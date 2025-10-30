import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function ButtonCustom({
  label = "Submit",
  type = "button",
  color = "primary",
  variant = "contained",
  size = "medium",
  fullWidth = true,
  startIcon = null,
  endIcon = null,
  disabled = false,
  loading = false,
  onClick = () => {},
  ...props
}) {
  return (
    <Button
      type={type}
      color={color}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <CircularProgress size={22} color="inherit" />
      ) : (
        label
      )}
    </Button>
  );
}
