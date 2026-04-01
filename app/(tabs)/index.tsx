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

// Static data for Phase 1 — will be replaced with real data in Phase 2
const LEVELS = [
  {
    id: 1,
    lessons: [
      { id: 'l1', title: 'Apna introduction do', subtitle: 'Reading', completed: 5, total: 18 },
      { id: 'l2', title: 'Family ke baare mein batao', subtitle: 'Reading', completed: 0, total: 18 },
      { id: 'l3', title: 'Apna kaam batao', subtitle: 'Speaking', completed: 0, total: 19 },
    ],
  },
  { id: 2, lessons: [] },
  { id: 3, lessons: [] },
];

const TOTAL_REQUIRED = 55;

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { isLessonComplete, totalCompletedSentences, celebratedLevels, markLevelCelebrated } =
    useProgress();
  const insets = useSafeAreaInsets();

  const [celebratingLevel, setCelebratingLevel] = useState<number | null>(null);

  // Derive which levels are unlocked
  const levelsWithLockState = LEVELS.map((level, idx) => {
    if (idx === 0) return { ...level, locked: false };
    const prevLevel = LEVELS[idx - 1];
    const prevComplete =
      prevLevel.lessons.length > 0 &&
      prevLevel.lessons.every((l) => isLessonComplete(l.id));
    return { ...level, locked: !prevComplete };
  });

  // Detect level completion and trigger confetti (only once per level)
  useEffect(() => {
    for (const level of LEVELS) {
      if (level.lessons.length === 0) continue;
      const allDone = level.lessons.every((l) => isLessonComplete(l.id));
      if (allDone && !celebratedLevels.includes(level.id)) {
        setCelebratingLevel(level.id);
        break;
      }
    }
  }, [totalCompletedSentences, celebratedLevels]);

  const completedSentences = Math.max(
    totalCompletedSentences,
    LEVELS[0].lessons.reduce((sum, l) => sum + l.completed, 0),
  );

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
          requiredSentences={TOTAL_REQUIRED}
        />

        {levelsWithLockState.map((level) => (
          <View key={level.id} style={styles.section}>
            <LevelBadge level={level.id} locked={level.locked} />
            {level.locked ? (
              <LockedCard />
            ) : (
              level.lessons.map((lesson, idx) => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  subtitle={lesson.subtitle}
                  completedSentences={
                    isLessonComplete(lesson.id) ? lesson.total : lesson.completed
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
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  bottomSpacer: {
    height: 80,
  },
});
