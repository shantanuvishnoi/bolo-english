import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LevelBadge } from '@/components/level-badge';
import { LevelProgressHeader } from '@/components/level-progress-header';
import { LessonCard } from '@/components/lesson-card';
import { LockedCard } from '@/components/locked-card';
import { LevelCompleteModal } from '@/components/level-complete-modal';
import { SurpriseGiftButton } from '@/components/surprise-gift-button';
import { useAppTheme } from '@/context/theme-context';
import { useProgress } from '@/context/progress-context';
import { getLessonsByLevel } from '@/constants/lessons';

const LEVEL_IDS = [1, 2, 3];

// Total sentences in Level 1 — used for the top progress bar
const LEVEL1_REQUIRED = getLessonsByLevel(1).reduce((sum, l) => sum + l.total, 0);

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { isLessonComplete, totalCompletedSentences, celebratedLevels, markLevelCelebrated } =
    useProgress();
  const insets = useSafeAreaInsets();

  const [celebratingLevel, setCelebratingLevel] = useState<number | null>(null);

  // Build levels with dynamic lock state, sourced entirely from constants/lessons.ts
  const levels = LEVEL_IDS.map((levelId, idx) => {
    const lessons = getLessonsByLevel(levelId);
    if (idx === 0) return { levelId, lessons, locked: false };
    const prevLessons = getLessonsByLevel(LEVEL_IDS[idx - 1]);
    const prevComplete =
      prevLessons.length > 0 && prevLessons.every((l) => isLessonComplete(l.id));
    return { levelId, lessons, locked: !prevComplete };
  });

  // Trigger confetti once per level when all its lessons are done
  useEffect(() => {
    for (const { levelId, lessons } of levels) {
      if (lessons.length === 0) continue;
      const allDone = lessons.every((l) => isLessonComplete(l.id));
      if (allDone && !celebratedLevels.includes(levelId)) {
        setCelebratingLevel(levelId);
        break;
      }
    }
  }, [totalCompletedSentences, celebratedLevels]);

  // Level 1 progress: use persisted total, fall back to seed values
  const level1SeedCompleted = getLessonsByLevel(1).reduce(
    (sum, l) => sum + (isLessonComplete(l.id) ? l.total : l.seedCompleted),
    0,
  );
  const completedSentences = Math.max(totalCompletedSentences, level1SeedCompleted);

  function handleLessonPress(lessonId: string) {
    router.push(`/lesson/${lessonId}`);
  }

  function handleDismissModal() {
    if (celebratingLevel !== null) {
      markLevelCelebrated(celebratingLevel);
      setCelebratingLevel(null);
    }
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <LevelProgressHeader
          currentLevel={1}
          completedSentences={completedSentences}
          requiredSentences={LEVEL1_REQUIRED}
        />

        {levels.map(({ levelId, lessons, locked }) => (
          <View key={levelId} style={styles.section}>
            <LevelBadge level={levelId} locked={locked} />
            {locked ? (
              <LockedCard />
            ) : (
              lessons.map((lesson, idx) => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  subtitle={lesson.subtitle}
                  completedSentences={
                    isLessonComplete(lesson.id) ? lesson.total : lesson.seedCompleted
                  }
                  totalSentences={lesson.total}
                  isCompleted={isLessonComplete(lesson.id)}
                  index={idx}
                  onPress={() => handleLessonPress(lesson.id)}
                />
              ))
            )}
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <SurpriseGiftButton />

      <LevelCompleteModal
        visible={celebratingLevel !== null}
        completedLevel={celebratingLevel ?? 1}
        onDismiss={handleDismissModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingBottom: 20 },
  section: { paddingHorizontal: 24, marginBottom: 8 },
  bottomSpacer: { height: 80 },
});
