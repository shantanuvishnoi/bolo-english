import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppColors } from '@/constants/theme';

interface LessonCardProps {
  title: string;
  subtitle: string;
  completedSentences: number;
  totalSentences: number;
  index?: number;
  onPress: () => void;
}

export function LessonCard({
  title,
  subtitle,
  completedSentences,
  totalSentences,
  index = 0,
  onPress,
}: LessonCardProps) {
  const remaining = Math.max(totalSentences - completedSentences, 0);

  function handlePress() {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  }

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).springify()}>
      <View style={styles.card}>
        <View style={styles.iconRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>📖</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>
              {subtitle} · {remaining} sentences seekho
            </Text>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={handlePress}
        >
          <Text style={styles.ctaText}>Continue Lesson</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e2a4a',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  title: {
    color: AppColors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    color: AppColors.textSecondary,
    fontSize: 12,
  },
  cta: {
    backgroundColor: AppColors.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaPressed: {
    opacity: 0.85,
  },
  ctaText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
