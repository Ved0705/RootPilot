import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#050712', paper: 'rgba(13,18,32,0.78)' },
    primary: { main: '#38bdf8', light: '#7dd3fc', dark: '#0284c7' },
    secondary: { main: '#8b5cf6', light: '#c4b5fd', dark: '#6d28d9' },
    success: { main: '#22c55e' }, warning: { main: '#f59e0b' }, error: { main: '#ef4444' },
    text: { primary: '#f4f8ff', secondary: '#9fb2ca' },
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h3: { fontWeight: 900 }, h4: { fontWeight: 900 }, h5: { fontWeight: 850 }, h6: { fontWeight: 820 }, button: { fontWeight: 800 },
  },
  shape: { borderRadius: 20 },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { minHeight: '100vh', background: 'radial-gradient(circle at 12% 0%, rgba(56,189,248,.20), transparent 30%), radial-gradient(circle at 90% 4%, rgba(139,92,246,.20), transparent 34%), radial-gradient(circle at 50% 100%, rgba(20,184,166,.10), transparent 38%), #050712', backgroundAttachment: 'fixed' }, '*::-webkit-scrollbar': { width: 10, height: 10 }, '*::-webkit-scrollbar-thumb': { background: 'rgba(148,163,184,.22)', borderRadius: 99 } } },
    MuiCard: { styleOverrides: { root: { background: 'linear-gradient(145deg, rgba(15,23,42,.88), rgba(15,23,42,.58))', border: '1px solid rgba(148,163,184,.14)', boxShadow: '0 24px 80px rgba(0,0,0,.32)', backdropFilter: 'blur(22px)' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 14 } } },
    MuiTableCell: { styleOverrides: { root: { borderColor: 'rgba(148,163,184,.12)' }, head: { color: '#cbd5e1', fontWeight: 900, letterSpacing: '.04em' } } },
    MuiDrawer: { styleOverrides: { paper: { backgroundImage: 'radial-gradient(circle at 0 0, rgba(56,189,248,.14), transparent 35%)' } } },
  },
});
