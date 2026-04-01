import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { LevelBadge } from '@/components/level-badge';
import { LevelProgressHeader } from '@/components/level-progress-header';
import { LessonCard } from '@/components/lesson-card';
import { LockedCard } from '@/components/locked-card';
import { SurpriseGiftButton } from '@/components/surprise-gift-button';
import { AppColors } from '@/constants/theme';

// Static data for Phase 1 — will be replaced with real data in Phase 2
const LEVELS = [
  {
    id: 1,
    locked: false,
    lessons: [
      {
        id: 'l1',
        title: 'Apna introduction do',
        subtitle: 'Reading',
        completed: 5,
        total: 18,
      },
      {
        id: 'l2',
        title: 'Family ke baare mein batao',
        subtitle: 'Reading',
        completed: 0,
        total: 18,
      },
      {
        id: 'l3',
        title: 'Apna kaam batao',
        subtitle: 'Speaking',
        completed: 0,
        total: 19,
      },
    ],
  },
  {
    id: 2,
    locked: true,
    lessons: [],
  },
  {
    id: 3,
    locked: true,
    lessons: [],
  },
];

const TOTAL_COMPLETED = 5;
const TOTAL_REQUIRED = 55;

export default function HomeScreen() {
  const router = useRouter();

  function handleLessonPress(lessonId: string) {
    router.push(`/lesson/${lessonId}`);
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <LevelProgressHeader
          currentLevel={1}
          completedSentences={TOTAL_COMPLETED}
          requiredSentences={TOTAL_REQUIRED}
        />

        {LEVELS.map((level) => (
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
                  completedSentences={lesson.completed}
                  totalSentences={lesson.total}
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  bottomSpacer: {
    height: 80,
  },
});
