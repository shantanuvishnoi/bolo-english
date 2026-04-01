import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ProgressBar } from '@/components/progress-bar';
import { useAppTheme } from '@/context/theme-context';

interface LessonCardProps {
  title: string;
  subtitle: string;
  completedSentences: number;
  totalSentences: number;
  isCompleted?: boolean;
  index?: number;
  onPress: () => void;
}

export function LessonCard({
  title,
  subtitle,
  completedSentences,
  totalSentences,
  isCompleted = false,
  index = 0,
  onPress,
}: LessonCardProps) {
  const { colors } = useAppTheme();
  const displayCompleted = isCompleted ? totalSentences : completedSentences;

  function handlePress() {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  }

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).springify()}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: isCompleted ? colors.completed : colors.border,
            borderWidth: isCompleted ? 1.5 : 1,
          },
        ]}
      >
        {/* Icon + title/subtitle row */}
        <View style={styles.iconRow}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: isCompleted ? colors.completedMuted : colors.accentMuted },
            ]}
          >
            <Text style={styles.iconText}>{isCompleted ? '✅' : '📖'}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
              {title}
            </Text>
            {isCompleted ? (
              <Text style={[styles.meta, { color: colors.completed }]}>
                Completed · {totalSentences}/{totalSentences} sentences
              </Text>
            ) : (
              <Text style={[styles.meta, { color: colors.textSecondary }]}>
                {subtitle} · {displayCompleted}/{totalSentences} sentences
              </Text>
            )}
          </View>
        </View>

        {/* Full-width progress bar, no count label */}
        <View style={styles.progressRow}>
          <ProgressBar
            value={displayCompleted}
            max={totalSentences}
            color={isCompleted ? colors.completed : colors.accent}
            showLabel={false}
            height={6}
          />
        </View>

        {!isCompleted && (
          <Pressable
            style={({ pressed }) => [
              styles.cta,
              { backgroundColor: colors.accent },
              pressed && styles.ctaPressed,
            ]}
            onPress={handlePress}
          >
            <Text style={styles.ctaText}>Continue Lesson</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
    lineHeight: 20,
  },
  meta: {
    fontSize: 12,
    lineHeight: 16,
  },
  progressRow: {
    marginBottom: 12,
  },
  cta: {
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
