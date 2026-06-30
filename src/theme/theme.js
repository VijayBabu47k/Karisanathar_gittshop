import { createTheme } from '@mui/material/styles';

export const MAROON = '#7B1A2D';
export const MAROON_DARK = '#5C0F1E';
export const MAROON_LIGHT = '#9B2940';
export const GOLD = '#C9A844';
export const GOLD_DARK = '#9A7E2E';
export const GOLD_LIGHT = '#DEC06E';

export function getTheme(mode) {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: MAROON,
        light: MAROON_LIGHT,
        dark: MAROON_DARK,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: GOLD,
        light: GOLD_LIGHT,
        dark: GOLD_DARK,
        contrastText: '#1A0A0D',
      },
      background: {
        default: isDark ? '#0D0608' : '#FFFBF5',
        paper: isDark ? '#1A0A0D' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F5E6E8' : '#1A0A0D',
        secondary: isDark ? '#C4A0A8' : '#6B4C53',
      },
      success: { main: '#00C853' },
      divider: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    },
    typography: {
      fontFamily: '"Inter", "Poppins", "Roboto", sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, letterSpacing: '0.02em' },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: 'none',
            padding: '10px 24px',
            fontSize: '0.93rem',
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_DARK} 100%)`,
            boxShadow: `0 4px 20px rgba(123,26,45,0.3)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${MAROON_LIGHT} 0%, ${MAROON} 100%)`,
              boxShadow: `0 6px 30px rgba(123,26,45,0.5)`,
            },
          },
          containedSecondary: {
            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`,
            color: '#1A0A0D',
            fontWeight: 700,
            '&:hover': {
              background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
            },
          },
          outlinedPrimary: {
            borderColor: MAROON,
            color: MAROON,
            '&:hover': { background: `rgba(123,26,45,0.06)`, borderColor: MAROON_DARK },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: isDark ? 'rgba(26,10,13,0.9)' : 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
            boxShadow: isDark
              ? '0 4px 24px rgba(0,0,0,0.4)'
              : '0 2px 16px rgba(0,0,0,0.06)',
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: 8 } },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            overflowX: 'hidden',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          },
          '*': {
            boxSizing: 'border-box',
          },
          img: {
            maxWidth: '100%',
            height: 'auto',
          },
        },
      },
    },
  });
}
