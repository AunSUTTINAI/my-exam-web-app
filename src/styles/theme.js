import { cyan, grey, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: cyan[600],
      light: cyan[300],
      dark: cyan[800],
      contrastText: "#ffffff",
    },
    secondary: {
      main: teal[500],
      light: teal[300],
      dark: teal[700],
      contrastText: "#ffffff",
    },
    error: {
      main: "#e53935",
      light: "#ef5350",
      dark: "#b71c1c",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#fb8c00",
      light: "#ffb74d",
      dark: "#e65100",
      contrastText: "#ffffff",
    },
    info: {
      main: cyan[500],
      light: cyan[300],
      dark: cyan[700],
      contrastText: "#ffffff",
    },
    success: {
      main: "#43a047",
      light: "#66bb6a",
      dark: "#2e7d32",
      contrastText: "#ffffff",
    },
    grey: {
      main: "#9e9e9e",
      light: "#e0e0e0",
      dark: "#616161",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f0f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
      disabled: grey[500],
    },
    divider: grey[300],
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: '"Prompt", "Kanit", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: { textTransform: "none", fontWeight: 600 },
  },

  components: {
    MuiDialogTitle: {
      defaultProps: {
        variant: "h6",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.info.dark,
          color: theme.palette.info.contrastText,
          padding: "16px 24px",
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          "& .MuiTypography-root": {
            fontSize: "1.25rem",
            fontWeight: 700,
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius * 2,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
        }),
      },
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        },
      },
    },
  },
});
