import { Suspense } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { theme } from './styles/theme';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}
