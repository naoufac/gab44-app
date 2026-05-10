// Gab44 design system — matches the warm earthy web palette.

export const colors = {
  bg: '#faf9f5',
  bgCard: '#ffffff',
  bgMuted: '#f1ede4',
  bgDark: '#e6e0d2',
  border: 'rgba(34,24,12,0.10)',
  borderStrong: 'rgba(34,24,12,0.18)',
  fg: '#1a1815',
  fgDim: '#5a564e',
  fgMuted: '#8b8779',
  fgOnAccent: '#fffaf2',
  accent: '#c96442',
  accent2: '#b85432',
  accentSoft: '#fdebe2',
  cyan: '#0ca8c9',
  violet: '#6943e0',
  magenta: '#c4308a',
  green: '#2e9e6a',
  amber: '#d59315',
  red: '#d63d4d',
  // Element colors
  fire: '#c96442',
  earth: '#7a8b5a',
  air: '#6943e0',
  water: '#0ca8c9',
}

export const fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  mono: 'monospace',
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
}

export const shadow = {
  sm: {
    shadowColor: '#140e04',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#140e04',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
}

export const elementColor: Record<string, string> = {
  fire: colors.fire,
  earth: colors.earth,
  air: colors.air,
  water: colors.water,
}

export const elementSoft: Record<string, string> = {
  fire: '#fdebe2',
  earth: '#eef0e5',
  air: '#ece6fb',
  water: '#dff4f8',
}
