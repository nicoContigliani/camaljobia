"use client"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import type { ReactNode } from "react"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f2937", // Dark gray for primary elements
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6366f1", // Indigo accent
      contrastText: "#ffffff",
    },
    background: {
      default: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
      paper: "rgba(255, 255, 255, 0.8)",
    },
    text: {
      primary: "#1f2937",
      secondary: "#64748b",
    },
    divider: "rgba(148, 163, 184, 0.2)",
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "-0.025em",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
          minHeight: 48,
          "&.Mui-selected": {
            color: "#6366f1",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#6366f1",
          height: 2,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(248, 250, 252, 0.5)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: "rgba(248, 250, 252, 0.8)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(248, 250, 252, 0.9)",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          padding: "12px 24px",
          boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.15)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
  },
})

interface MaterialThemeProviderProps {
  children: ReactNode
}

export function MaterialThemeProvider({ children }: MaterialThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
