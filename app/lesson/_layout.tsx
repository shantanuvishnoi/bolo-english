import { Stack } from 'expo-router';

import { AppColors } from '@/constants/theme';

export default function LessonLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: AppColors.background },
        headerTintColor: AppColors.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: AppColors.background },
      }}
    />
  );
}
