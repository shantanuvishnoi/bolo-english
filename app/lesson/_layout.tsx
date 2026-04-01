import { Stack } from 'expo-router';

import { useAppTheme } from '@/context/theme-context';

export default function LessonLayout() {
  const { colors } = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.accent,
        headerTitleStyle: { fontWeight: '700', color: colors.textPrimary },
        contentStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
      }}
    />
  );
}
