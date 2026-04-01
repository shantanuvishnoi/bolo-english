import { StyleSheet, Text, View } from 'react-native';

import { AppColors } from '@/constants/theme';
import { ProgressBar } from '@/components/progress-bar';

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
  const remaining = Math.max(requiredSentences - completedSentences, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.levelLabel}>LEVEL {currentLevel}</Text>
      <Text style={styles.subtitle}>Apna introduction do</Text>
      <Text style={styles.hint}>
        {remaining} aur sentences seekho level {currentLevel + 1} tak pahunchne ke liye
      </Text>
      <View style={styles.progressRow}>
        <ProgressBar value={completedSentences} max={requiredSentences} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  levelLabel: {
    color: AppColors.levelBadge,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    color: AppColors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  hint: {
    color: AppColors.textSecondary,
    fontSize: 13,
    marginBottom: 10,
    lineHeight: 18,
  },
  progressRow: {
    marginTop: 4,
  },
});
