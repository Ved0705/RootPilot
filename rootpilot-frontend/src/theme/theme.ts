import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6', // Observability Blue
      dark: '#1D4ED8',
      light: '#60A5FA',
    },
    secondary: {
      main: '#64748B', // Slate Grey
      dark: '#475569',
      light: '#94A3B8',
    },
    background: {
      default: '#0B0E14', // Very dark slate grey
      paper: '#111622',   // Card / panel dark
    },
    divider: '#242C3F', // Sharp borders
    text: {
      primary: '#E2E8F0',
      secondary: '#94A3B8',
      disabled: '#64748B',
    },
    error: {
      main: '#EF4444', // Critical red
      light: '#F87171',
    },
    warning: {
      main: '#F59E0B', // Amber warning
      light: '#FBBF24',
    },
    success: {
      main: '#10B981', // Healthy green
      light: '#34D399',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 13,
    htmlFontSize: 16,
    h1: { fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0em' },
    subtitle1: { fontSize: '0.85rem', fontWeight: 500 },
    subtitle2: { fontSize: '0.75rem', fontWeight: 500 },
    body1: { fontSize: '0.85rem', lineHeight: 1.5 },
    body2: { fontSize: '0.75rem', lineHeight: 1.4, color: '#94A3B8' },
    caption: { fontSize: '0.68rem', lineHeight: 1.3 },
    button: { textTransform: 'none', fontWeight: 600, fontSize: '0.78rem' },
  },
  shape: {
    borderRadius: 4, // Sharp, professional enterprise corners
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111622',
          border: '1px solid #242C3F',
          boxShadow: 'none',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '10px 14px',
          borderBottom: '1px solid #242C3F',
          backgroundColor: '#151C2C',
        },
        title: {
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#E2E8F0',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '12px 14px',
          '&:last-child': {
            paddingBottom: '12px',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '4px 10px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '6px 12px',
          borderColor: '#242C3F',
          fontSize: '0.78rem',
        },
        head: {
          backgroundColor: '#151C2C',
          fontWeight: 700,
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#94A3B8',
          paddingTop: '8px',
          paddingBottom: '8px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.015)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontSize: '0.8rem',
            backgroundColor: '#0B0E14',
            '& fieldset': {
              borderColor: '#242C3F',
            },
            '&:hover fieldset': {
              borderColor: '#3B82F6',
            },
          },
        },
      },
    },
    MuiChip: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          borderRadius: 2,
          fontWeight: 600,
          fontSize: '0.68rem',
          height: '20px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#242C3F',
        },
      },
    },
  },
});
