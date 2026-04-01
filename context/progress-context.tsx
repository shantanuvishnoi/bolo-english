import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { LESSONS } from '@/constants/lessons';

interface ProgressContextValue {
  completedLessons: string[];
  isLessonComplete: (lessonId: string) => boolean;
  markLessonComplete: (lessonId: string) => void;
  totalCompletedSentences: number;
  celebratedLevels: number[];
  markLevelCelebrated: (levelId: number) => void;
}

const ProgressContext = createContext<ProgressContextValue>({
  completedLessons: [],
  isLessonComplete: () => false,
  markLessonComplete: () => {},
  totalCompletedSentences: 0,
  celebratedLevels: [],
  markLevelCelebrated: () => {},
});

const LESSONS_KEY = '@bolo_completed_lessons';
const LEVELS_KEY = '@bolo_celebrated_levels';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [celebratedLevels, setCelebratedLevels] = useState<number[]>([]);

  useEffect(() => {
    AsyncStorage.multiGet([LESSONS_KEY, LEVELS_KEY]).then((pairs) => {
      try {
        if (pairs[0][1]) setCompletedLessons(JSON.parse(pairs[0][1]));
        if (pairs[1][1]) setCelebratedLevels(JSON.parse(pairs[1][1]));
      } catch {}
    });
  }, []);

  const markLessonComplete = useCallback((lessonId: string) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) return prev;
      const next = [...prev, lessonId];
      AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isLessonComplete = useCallback(
    (lessonId: string) => completedLessons.includes(lessonId),
    [completedLessons],
  );

  const markLevelCelebrated = useCallback((levelId: number) => {
    setCelebratedLevels((prev) => {
      if (prev.includes(levelId)) return prev;
      const next = [...prev, levelId];
      AsyncStorage.setItem(LEVELS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const totalCompletedSentences = useMemo(
    () =>
      completedLessons.reduce((sum, id) => {
        const lesson = LESSONS.find((l) => l.id === id);
        return sum + (lesson?.total ?? 0);
      }, 0),
    [completedLessons],
  );

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        isLessonComplete,
        markLessonComplete,
        totalCompletedSentences,
        celebratedLevels,
        markLevelCelebrated,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
