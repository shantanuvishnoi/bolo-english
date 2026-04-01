import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/context/theme-context';

export function CenterTabIcon(props: BottomTabBarButtonProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: colors.accent,
            shadowColor: colors.accent,
          },
          pressed && styles.pressed,
        ]}
        onPress={(e) => {
          if (process.env.EXPO_OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
          props.onPress?.(e as any);
        }}
        accessibilityRole="button"
        accessibilityLabel="Practice"
      >
        <Text style={styles.icon}>⚡</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -12 }],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  pressed: {
    opacity: 0.85,
  },
  icon: {
    fontSize: 22,
  },
});
