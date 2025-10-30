import React from "react";
import TextField from "@mui/material/TextField";

export default function TextFieldCustom({
  label = "",
  name = "",
  value = "",
  type = "text",
  placeholder = "",
  errorText = "",
  required = false,
  disabled = false,
  fullWidth = true,
  onChange = () => {},
  multiline = false,
  rows = 3,
  ...props
}) {
  const validateValueByType = (val) => {
    if (!required) return true;
    if (val == null || String(val).trim() === "") return false;

    switch (type) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      case "number":
        return !isNaN(Number(val));
      case "tel":
        return /^[0-9+()\s-]+$/.test(val);
      case "url":
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      default:
        return true;
    }
  };

  const isValid = validateValueByType(value);

  const isError = (required && !isValid) || Boolean(errorText);

  const helper =
    errorText ||
    (required && !isValid
      ? type === "email"
        ? ""
        : type === "number"
        ? ""
        : ""
      : "");

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      error={isError}
      helperText={helper}
      fullWidth={fullWidth}
      required={required}
      multiline={multiline}
      rows={multiline ? rows : 1}
      variant="outlined"
      size={multiline ? "medium" : "small"}
      {...props}
    />
  );
}
