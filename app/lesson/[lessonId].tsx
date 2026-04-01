import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressBar } from '@/components/progress-bar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppTheme } from '@/context/theme-context';
import { useProgress } from '@/context/progress-context';
import { LESSON_SENTENCES, getLessonById } from '@/constants/lessons';

const SPEECH_OPTIONS: Speech.SpeechOptions = {
  language: 'en-IN',
  rate: 0.8,
  pitch: 1.0,
};

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const { colors } = useAppTheme();
  const { markLessonComplete } = useProgress();
  const insets = useSafeAreaInsets();

  const lessonMeta = getLessonById(lessonId);
  const sentences = LESSON_SENTENCES[lessonId] ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const current = sentences[currentIndex];
  const isLast = currentIndex === sentences.length - 1;

  const speak = useCallback(
    (text: string) => {
      Speech.stop();
      setIsSpeaking(true);
      Speech.speak(text, {
        ...SPEECH_OPTIONS,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    },
    [],
  );

  // Stop speech when screen unmounts
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  function handleReveal() {
    setRevealed(true);
    speak(current.english);
  }

  function handleNext() {
    Speech.stop();
    setIsSpeaking(false);
    if (isLast) {
      markLessonComplete(lessonId);
      router.back();
      return;
    }
    setRevealed(false);
    setCurrentIndex((i) => i + 1);
  }

  if (!current) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>Lesson not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: lessonMeta?.title ?? lessonId }} />

      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingBottom: Math.max(insets.bottom + 16, 32),
          },
        ]}
      >
        {/* Progress bar */}
        <View style={styles.progressSection}>
          <ProgressBar
            value={currentIndex + 1}
            max={sentences.length}
            color={colors.accent}
            showLabel={false}
            height={6}
          />
          <Text style={[styles.progressCount, { color: colors.textSecondary }]}>
            {currentIndex + 1}/{sentences.length}
          </Text>
        </View>

        {/* Sentence card */}
        <Animated.View
          key={currentIndex}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={styles.card}
        >
          <Text style={[styles.hindiText, { color: colors.textPrimary }]}>{current.hindi}</Text>

          {revealed ? (
            <View style={styles.englishRow}>
              <Text style={[styles.englishText, { color: colors.progressFill, flex: 1 }]}>
                {current.english}
              </Text>
              <Pressable
                onPress={() => speak(current.english)}
                style={[
                  styles.speakerButton,
                  {
                    backgroundColor: isSpeaking ? colors.accentMuted : colors.surfaceElevated,
                  },
                ]}
                hitSlop={8}
              >
                <IconSymbol
                  name="speaker.wave.2.fill"
                  size={20}
                  color={isSpeaking ? colors.accent : colors.textSecondary}
                />
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={[styles.revealButton, { borderColor: colors.accent }]}
              onPress={handleReveal}
            >
              <Text style={[styles.revealText, { color: colors.accent }]}>Tap to reveal</Text>
            </Pressable>
          )}
        </Animated.View>

        {/* Next / Finish button */}
        <Pressable
          style={({ pressed }) => [
            styles.nextButton,
            { backgroundColor: colors.accent },
            !revealed && styles.nextDisabled,
            pressed && styles.nextPressed,
          ]}
          onPress={handleNext}
          disabled={!revealed}
        >
          <Text style={styles.nextText}>{isLast ? 'Finish Lesson ✓' : 'Next →'}</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressCount: {
    fontSize: 12,
    minWidth: 36,
    textAlign: 'right',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    paddingHorizontal: 8,
  },
  hindiText: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 38,
  },
  englishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
  },
  englishText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
  },
  speakerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  revealButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  revealText: {
    fontSize: 15,
    fontWeight: '600',
  },
  nextButton: {
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
    fontSize: 16,
    textAlign: 'center',
  },
});
