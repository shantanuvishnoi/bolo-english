import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@/components/progress-bar';
import { useAppTheme } from '@/context/theme-context';

interface LevelProgressHeaderProps {
  currentLevel: number;
  completedSentences: number;
  requiredSentences: number;
}

export function LevelProgressHeader({
  currentLevel,
  completedSentences,
  requiredSentences,
}: LevelProgressHeaderProps) {
  const { colors, isDark, toggleTheme } = useAppTheme();
  const remaining = Math.max(requiredSentences - completedSentences, 0);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text
          style={[styles.title, { color: colors.textPrimary }]}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          Welcome to Bolo English
        </Text>
        <Pressable
          onPress={toggleTheme}
          style={[styles.themeToggle, { backgroundColor: colors.surfaceElevated }]}
          hitSlop={8}
        >
          <Text style={styles.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
        </Pressable>
      </View>

      <Text style={[styles.hint, { color: colors.textSecondary }]}>
        {remaining} sentences remaining to reach Level {currentLevel + 1}
      </Text>

      <View style={styles.progressRow}>
        <ProgressBar
          value={completedSentences}
          max={requiredSentences}
          color={colors.progressFill}
          showLabel={false}
          height={10}
        />
        <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
          {completedSentences}/{requiredSentences}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
    lineHeight: 28,
  },
  themeToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  themeIcon: {
    fontSize: 16,
  },
  hint: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressLabel: {
    fontSize: 12,
    minWidth: 44,
    textAlign: 'right',
  },
});
