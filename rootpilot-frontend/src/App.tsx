import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRoutes } from './routes/AppRoutes';
import { theme } from './theme/theme';

const queryClient = new QueryClient();
export default function App() { return <QueryClientProvider client={queryClient}><ThemeProvider theme={theme}><CssBaseline /><AppRoutes /></ThemeProvider></QueryClientProvider>; }
