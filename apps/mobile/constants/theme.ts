import { Platform } from 'react-native';

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceElevated: string;
  accent: string;
  accentMuted: string;
  levelBadge: string;
  progressFill: string;
  textPrimary: string;
  textSecondary: string;
  locked: string;
  lockedIcon: string;
  lockedBorder: string;
  tabBar: string;
  tabBarBorder: string;
  completed: string;
  completedMuted: string;
  border: string;
};

export const LightColors: ThemeColors = {
  background: '#FAF8F5',
  surface: '#FFFFFF',
  surfaceElevated: '#F5F0EB',
  accent: '#6366F1',
  accentMuted: 'rgba(99,102,241,0.10)',
  levelBadge: '#7C3AED',
  progressFill: '#10B981',
  textPrimary: '#1C1917',
  textSecondary: '#78716C',
  locked: '#EDE9E3',
  lockedIcon: '#A8A29E',
  lockedBorder: '#D6D0C8',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E7E5E4',
  completed: '#16A34A',
  completedMuted: 'rgba(22,163,74,0.10)',
  border: '#E7E5E4',
};

export const DarkColors: ThemeColors = {
  background: '#1a1a2e',
  surface: '#16213e',
  surfaceElevated: '#0f3460',
  accent: '#818CF8',
  accentMuted: 'rgba(129,140,248,0.15)',
  levelBadge: '#A78BFA',
  progressFill: '#4ecca3',
  textPrimary: '#eaeaea',
  textSecondary: '#8892b0',
  locked: '#2d2d44',
  lockedIcon: '#555577',
  lockedBorder: '#3a3a5a',
  tabBar: '#0d0d1a',
  tabBarBorder: '#1e1e3a',
  completed: '#4ade80',
  completedMuted: 'rgba(74,222,128,0.12)',
  border: '#1e2a4a',
};

// Legacy alias for any code not yet migrated to useAppTheme()
export const AppColors = DarkColors;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
