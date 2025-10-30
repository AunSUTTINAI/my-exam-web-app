import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

export default function AutocompleteCustom({
  label = "",
  name = "",
  value = null,
  options = [],
  placeholder = "",
  errorText = "",
  required = false,
  disabled = false,
  fullWidth = true,
  multiple = false,
  freeSolo = false,
  loading = false,
  size = "small",
  noOptionsText = "ไม่พบข้อมูล",
  limitTags,
  disableClearable = false,
  readOnly = false,
  getOptionLabel,
  isOptionEqualToValue,
  // อีเวนต์
  onChange = () => {},
  onInputChange,
  textFieldProps = {},
  ...autoProps
}) {
  const isEmpty =
    value == null ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0);

  const isError = Boolean(errorText) || (required && isEmpty);
  const helper = errorText || (required && isEmpty ? "" : "");

  const _getOptionLabel =
    getOptionLabel ||
    ((opt) => {
      if (opt == null) return "";
      if (typeof opt === "string") return opt;
      return (
        opt.label ??
        opt.name ??
        opt.title ??
        (opt.value != null ? String(opt.value) : "")
      );
    });

  const _isOptionEqualToValue =
    isOptionEqualToValue ||
    ((opt, val) => {
      const left = typeof opt === "object" ? opt?.value ?? opt?.id ?? opt : opt;
      const right =
        typeof val === "object" ? val?.value ?? val?.id ?? val : val;
      return left === right;
    });

  const normalizedValue = multiple ? value ?? [] : value ?? null;

  return (
    <Autocomplete
      multiple={multiple}
      freeSolo={freeSolo}
      options={options}
      value={normalizedValue}
      getOptionLabel={_getOptionLabel}
      isOptionEqualToValue={_isOptionEqualToValue}
      loading={loading}
      disabled={disabled}
      readOnly={readOnly}
      noOptionsText={noOptionsText}
      fullWidth={fullWidth}
      disableClearable={disableClearable}
      limitTags={limitTags}
      onChange={(event, newValue) => onChange(newValue, { event, name })}
      onInputChange={
        onInputChange
          ? (event, newInput, reason) =>
              onInputChange(newInput, { event, name, reason })
          : undefined
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          placeholder={placeholder}
          required={required}
          error={isError}
          helperText={helper}
          fullWidth={fullWidth}
          size={size}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          {...textFieldProps}
        />
      )}
      {...autoProps}
    />
  );
}
