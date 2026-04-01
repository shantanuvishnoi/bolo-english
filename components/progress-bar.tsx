import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

import { useAppTheme } from '@/context/theme-context';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  trackColor?: string;
  height?: number;
  label?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max,
  color,
  trackColor,
  height = 8,
  label,
  showLabel = true,
}: ProgressBarProps) {
  const { colors } = useAppTheme();
  const fillColor = color ?? colors.progressFill;
  const trackBg = trackColor ?? (colors.surface === '#FFFFFF' ? '#E7E5E4' : '#2a2a4a');

  const progress = useSharedValue(0);
  const pct = max > 0 ? Math.min(value / max, 1) : 0;

  useEffect(() => {
    progress.value = withTiming(pct, { duration: 600 });
  }, [pct]);

  const displayLabel = label ?? `${value}/${max}`;

  return (
    <View style={styles.container}>
      <View style={[styles.track, { backgroundColor: trackBg, height, borderRadius: height / 2 }]}>
        <Animated.View
          style={[
            styles.fill,
            { backgroundColor: fillColor, width: `${pct * 100}%`, borderRadius: height / 2 },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={[styles.label, { color: colors.textSecondary }]}>{displayLabel}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  track: {
    flex: 1,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  label: {
    fontSize: 12,
    minWidth: 36,
    textAlign: 'right',
  },
});
