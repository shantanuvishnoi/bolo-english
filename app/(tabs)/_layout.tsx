import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CenterTabIcon } from '@/components/center-tab-icon';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppTheme } from '@/context/theme-context';

const ICON_SIZE = 29; // 24 × 1.2

export default function TabLayout() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={ICON_SIZE} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="membership"
        options={{
          title: 'Membership',
          tabBarIcon: ({ color }) => <IconSymbol size={ICON_SIZE} name="star.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="center"
        options={{
          title: '',
          tabBarButton: CenterTabIcon,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI',
          tabBarIcon: ({ color }) => <IconSymbol size={ICON_SIZE} name="message.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <IconSymbol size={ICON_SIZE} name="chart.bar.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
