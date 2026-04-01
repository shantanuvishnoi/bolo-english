import { DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppThemeProvider, useAppTheme } from '@/context/theme-context';
import { ProgressProvider } from '@/context/progress-context';
import { LightColors, DarkColors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function NavigationRoot() {
  const { isDark, colors } = useAppTheme();

  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.tabBar,
          text: colors.textPrimary,
          border: colors.tabBarBorder,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          card: colors.tabBar,
          text: colors.textPrimary,
          border: colors.tabBarBorder,
        },
      };

  return (
    <ThemeProvider value={navTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="lesson" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <ProgressProvider>
        <NavigationRoot />
      </ProgressProvider>
    </AppThemeProvider>
  );
}
