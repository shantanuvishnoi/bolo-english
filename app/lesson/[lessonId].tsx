import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { AppColors } from '@/constants/theme';

// Placeholder sentence data — Phase 2 will load from data/lessons.ts
const LESSON_SENTENCES: Record<string, { hindi: string; english: string }[]> = {
  l1: [
    { hindi: 'Mera naam John hai.', english: 'My name is John.' },
    { hindi: 'Main India se hoon.', english: 'I am from India.' },
    { hindi: 'Mujhe English seekhna hai.', english: 'I want to learn English.' },
    { hindi: 'Aap kaise hain?', english: 'How are you?' },
    { hindi: 'Main theek hoon.', english: 'I am fine.' },
  ],
  l2: [
    { hindi: 'Mere paas ek bhai hai.', english: 'I have one brother.' },
    { hindi: 'Meri maa ghar par hain.', english: 'My mother is at home.' },
    { hindi: 'Hamara parivaar chota hai.', english: 'Our family is small.' },
  ],
  l3: [
    { hindi: 'Main ek teacher hoon.', english: 'I am a teacher.' },
    { hindi: 'Main office mein kaam karta hoon.', english: 'I work in an office.' },
  ],
};

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const sentences = LESSON_SENTENCES[lessonId] ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const current = sentences[currentIndex];
  const isLast = currentIndex === sentences.length - 1;

  function handleReveal() {
    setRevealed(true);
  }

  function handleNext() {
    if (isLast) {
      router.back();
      return;
    }
    setRevealed(false);
    setCurrentIndex((i) => i + 1);
  }

  if (!current) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lesson not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressDots}>
        {sentences.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i < currentIndex && styles.dotDone, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      <Animated.View key={currentIndex} entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)} style={styles.card}>
        <Text style={styles.hindiText}>{current.hindi}</Text>

        {revealed ? (
          <Animated.Text entering={FadeIn.duration(250)} style={styles.englishText}>
            {current.english}
          </Animated.Text>
        ) : (
          <Pressable style={styles.revealButton} onPress={handleReveal}>
            <Text style={styles.revealText}>Tap to reveal</Text>
          </Pressable>
        )}
      </Animated.View>

      <Pressable
        style={({ pressed }) => [styles.nextButton, !revealed && styles.nextDisabled, pressed && styles.nextPressed]}
        onPress={handleNext}
        disabled={!revealed}
      >
        <Text style={styles.nextText}>{isLast ? 'Finish Lesson ✓' : 'Next →'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    padding: 24,
    justifyContent: 'space-between',
  },
  progressDots: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    paddingTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2a2a4a',
  },
  dotDone: {
    backgroundColor: AppColors.progressFill,
  },
  dotActive: {
    backgroundColor: AppColors.accent,
    width: 20,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  hindiText: {
    color: AppColors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 38,
  },
  englishText: {
    color: AppColors.progressFill,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  revealButton: {
    borderWidth: 1,
    borderColor: AppColors.accent,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  revealText: {
    color: AppColors.accent,
    fontSize: 15,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: AppColors.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  nextDisabled: {
    opacity: 0.4,
  },
  nextPressed: {
    opacity: 0.85,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: AppColors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});
