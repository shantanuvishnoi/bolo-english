import { useEffect, useMemo } from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { useAppTheme } from '@/context/theme-context';

const { width: W, height: H } = Dimensions.get('window');

const COLORS = ['#6366F1', '#A78BFA', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899', '#F97316'];
const COUNT = 55;

interface ParticleData {
  id: number;
  x: number;
  color: string;
  delay: number;
  w: number;
  h: number;
  drift: number;
  duration: number;
}

function useParticles(): ParticleData[] {
  return useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * W,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 1400,
        w: 6 + Math.random() * 8,
        h: 4 + Math.random() * 5,
        drift: (Math.random() - 0.5) * 140,
        duration: 2600 + Math.random() * 900,
      })),
    [],
  );
}

function Particle({ p }: { p: ParticleData }) {
  const ty = useSharedValue(-20);
  const tx = useSharedValue(0);
  const rot = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const ease = Easing.in(Easing.quad);
    ty.value = withDelay(p.delay, withTiming(H + 40, { duration: p.duration, easing: ease }));
    tx.value = withDelay(p.delay, withTiming(p.drift, { duration: p.duration }));
    rot.value = withDelay(p.delay, withTiming(480 + Math.random() * 360, { duration: p.duration }));
    opacity.value = withDelay(
      p.delay + p.duration * 0.65,
      withTiming(0, { duration: p.duration * 0.35 }),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: ty.value },
      { translateX: tx.value },
      { rotate: `${rot.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: p.x,
          width: p.w,
          height: p.h,
          backgroundColor: p.color,
          borderRadius: 2,
        },
        style,
      ]}
    />
  );
}

interface LevelCompleteModalProps {
  visible: boolean;
  completedLevel: number;
  onDismiss: () => void;
}

export function LevelCompleteModal({
  visible,
  completedLevel,
  onDismiss,
}: LevelCompleteModalProps) {
  const { colors } = useAppTheme();
  const particles = useParticles();

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible statusBarTranslucent>
      <View style={styles.root}>
        {/* Confetti particles render above everything */}
        {particles.map((p) => (
          <Particle key={p.id} p={p} />
        ))}

        {/* Dimmed backdrop */}
        <Animated.View entering={FadeIn.duration(250)} style={styles.backdrop} />

        {/* Celebration card */}
        <Animated.View
          entering={SlideInDown.springify().damping(15).mass(0.8)}
          style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Text style={styles.trophy}>🏆</Text>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Level {completedLevel} Complete!
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            Bahut badiya! You've unlocked{'\n'}Level {completedLevel + 1}. Keep it up!
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.btn,
              { backgroundColor: colors.accent },
              pressed && styles.btnPressed,
            ]}
            onPress={onDismiss}
          >
            <Text style={styles.btnText}>Continue →</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  card: {
    width: '82%',
    borderRadius: 28,
    padding: 36,
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 14,
  },
  trophy: {
    fontSize: 56,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  body: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 23,
  },
  btn: {
    marginTop: 6,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 48,
    alignItems: 'center',
    width: '100%',
  },
  btnPressed: {
    opacity: 0.85,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
