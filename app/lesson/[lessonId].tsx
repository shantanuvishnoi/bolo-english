import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressBar } from '@/components/progress-bar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppTheme } from '@/context/theme-context';
import { useProgress } from '@/context/progress-context';
import { LESSON_SENTENCES, getLessonById } from '@/constants/lessons';
import { useSound } from '@/hooks/use-sound';
import { buildQuiz } from '@/utils/quiz';

type AnswerState = 'idle' | 'correct' | 'wrong';

const SPEECH_OPTIONS: Speech.SpeechOptions = { language: 'en-IN', rate: 0.8, pitch: 1.0 };

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const { colors } = useAppTheme();
  const { markLessonComplete } = useProgress();
  const insets = useSafeAreaInsets();
  const { playCorrect, playWrong } = useSound();

  const lessonMeta = getLessonById(lessonId);
  const sentences = LESSON_SENTENCES[lessonId] ?? [];
  const questions = useMemo(() => buildQuiz(sentences), [lessonId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [selectedOption, setSelectedOption] = useState<0 | 1 | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  // True once the audio for the current correct answer has finished playing
  const [speechDone, setSpeechDone] = useState(false);

  const wrongResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shakeX.value }] }));

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  useEffect(() => () => {
    Speech.stop();
    if (wrongResetTimer.current) clearTimeout(wrongResetTimer.current);
  }, []);

  /** Speak text. onFinished fires when audio ends (or errors). */
  const speak = useCallback((text: string, onFinished?: () => void) => {
    Speech.stop();
    setIsSpeaking(true);
    Speech.speak(text, {
      ...SPEECH_OPTIONS,
      onDone: () => {
        setIsSpeaking(false);
        onFinished?.();
      },
      onStopped: () => setIsSpeaking(false),
      onError: () => {
        setIsSpeaking(false);
        onFinished?.(); // treat error as done so Next is never permanently hidden
      },
    });
  }, []);

  function handleOptionPress(optionIndex: 0 | 1) {
    if (answerState !== 'idle') return;

    const isCorrect = optionIndex === current.correctOptionIndex;
    setSelectedOption(optionIndex);
    setAnswerState(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      playCorrect();
      if (process.env.EXPO_OS === 'ios') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      setSpeechDone(false);
      const fullSentence = sentences[currentIndex]?.english ?? '';
      speak(fullSentence, () => setSpeechDone(true));
    } else {
      playWrong();
      if (process.env.EXPO_OS === 'ios') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      shakeX.value = withSequence(
        withTiming(-10, { duration: 60 }),
        withTiming(10, { duration: 60 }),
        withTiming(-8, { duration: 60 }),
        withTiming(8, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
      wrongResetTimer.current = setTimeout(() => {
        setAnswerState('idle');
        setSelectedOption(null);
      }, 950);
    }
  }

  function handleNext() {
    Speech.stop();
    setIsSpeaking(false);
    if (isLast) {
      markLessonComplete(lessonId);
      router.back();
      return;
    }
    setCurrentIndex((i) => i + 1);
    setAnswerState('idle');
    setSelectedOption(null);
    setSpeechDone(false);
  }

  function optionBg(optionIndex: 0 | 1) {
    if (answerState === 'idle') return { backgroundColor: colors.surface, borderColor: colors.border };
    if (selectedOption === optionIndex) {
      return answerState === 'correct'
        ? { backgroundColor: colors.completedMuted, borderColor: colors.completed }
        : { backgroundColor: 'rgba(239,68,68,0.12)', borderColor: '#EF4444' };
    }
    return { backgroundColor: colors.surface, borderColor: colors.border, opacity: 0.4 };
  }

  function optionTextColor(optionIndex: 0 | 1): string {
    if (answerState === 'idle') return colors.textPrimary;
    if (selectedOption === optionIndex) {
      return answerState === 'correct' ? colors.completed : '#EF4444';
    }
    return colors.textSecondary;
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
        {/* Progress */}
        <View style={styles.progressRow}>
          <ProgressBar
            value={currentIndex}
            max={questions.length}
            color={colors.accent}
            showLabel={false}
            height={6}
          />
          <Text style={[styles.progressCount, { color: colors.textSecondary }]}>
            {currentIndex}/{questions.length}
          </Text>
        </View>

        {/* Question card */}
        <Animated.View
          key={currentIndex}
          entering={FadeIn.duration(280)}
          exiting={FadeOut.duration(180)}
          style={[styles.cardWrapper, shakeStyle]}
        >
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.hindiText, { color: colors.textSecondary }]}>
              {sentences[currentIndex]?.hindi}
            </Text>

            <Text style={[styles.sentenceText, { color: colors.textPrimary }]}>
              {current.displaySentence}
            </Text>

            {/* Revealed answer row — shown after correct selection */}
            {answerState === 'correct' && (
              <Animated.View entering={FadeIn.duration(200)} style={styles.revealRow}>
                <Pressable
                  onPress={() => speak(sentences[currentIndex]?.english ?? '')}
                  style={[
                    styles.speakerButton,
                    { backgroundColor: isSpeaking ? colors.accentMuted : colors.surfaceElevated },
                  ]}
                  hitSlop={8}
                >
                  <IconSymbol
                    name="speaker.wave.2.fill"
                    size={18}
                    color={isSpeaking ? colors.accent : colors.textSecondary}
                  />
                </Pressable>
                <Text style={[styles.revealedSentence, { color: colors.completed }]}>
                  {sentences[currentIndex]?.english}
                </Text>
              </Animated.View>
            )}
          </View>
        </Animated.View>

        {/* Options */}
        <View style={styles.optionsRow}>
          {current.options.map((option, idx) => (
            <Pressable
              key={idx}
              style={[styles.optionButton, optionBg(idx as 0 | 1)]}
              onPress={() => handleOptionPress(idx as 0 | 1)}
              disabled={answerState !== 'idle'}
            >
              <Text style={[styles.optionText, { color: optionTextColor(idx as 0 | 1) }]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Feedback banner */}
        {answerState !== 'idle' && (
          <Animated.View
            entering={FadeIn.duration(200)}
            style={[
              styles.feedbackBanner,
              {
                backgroundColor:
                  answerState === 'correct' ? colors.completedMuted : 'rgba(239,68,68,0.10)',
                borderColor: answerState === 'correct' ? colors.completed : '#EF4444',
              },
            ]}
          >
            <Text
              style={[
                styles.feedbackText,
                { color: answerState === 'correct' ? colors.completed : '#EF4444' },
              ]}
            >
              {answerState === 'correct' ? '✓  Sahi jawab!' : '✗  Dobara try karo!'}
            </Text>
          </Animated.View>
        )}

        {/* Next CTA — only appears after audio finishes */}
        {answerState === 'correct' && speechDone && (
          <Animated.View entering={FadeIn.duration(250)}>
            <Pressable
              style={({ pressed }) => [
                styles.nextButton,
                { backgroundColor: colors.accent },
                pressed && { opacity: 0.85 },
              ]}
              onPress={handleNext}
            >
              <Text style={styles.nextText}>
                {isLast ? 'Finish Lesson ✓' : 'Next →'}
              </Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressCount: {
    fontSize: 12,
    minWidth: 36,
    textAlign: 'right',
  },
  cardWrapper: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 20,
  },
  hindiText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  sentenceText: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
  },
  revealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  speakerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  revealedSentence: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 17,
    fontWeight: '700',
  },
  feedbackBanner: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 15,
    fontWeight: '700',
  },
  nextButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});
