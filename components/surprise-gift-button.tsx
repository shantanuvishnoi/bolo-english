import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useAppTheme } from '@/context/theme-context';

interface SurpriseGiftButtonProps {
  onPress?: () => void;
}

export function SurpriseGiftButton({ onPress }: SurpriseGiftButtonProps) {
  const { colors } = useAppTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePress() {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    if (process.env.EXPO_OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    onPress?.();
  }

  return (
    <Animated.View
      entering={FadeInRight.delay(400).springify()}
      style={[styles.container, animatedStyle]}
    >
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: colors.levelBadge,
            shadowColor: colors.levelBadge,
          },
        ]}
        onPress={handlePress}
      >
        <Text style={styles.emoji}>🎁</Text>
        <Text style={styles.label}>Surprise Gift</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  emoji: {
    fontSize: 16,
  },
  label: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
