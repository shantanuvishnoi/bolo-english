import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

import { AppColors } from '@/constants/theme';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, max, color = AppColors.progressFill, showLabel = true }: ProgressBarProps) {
  const progress = useSharedValue(0);
  const pct = max > 0 ? Math.min(value / max, 1) : 0;

  useEffect(() => {
    progress.value = withTiming(pct, { duration: 600 });
  }, [pct]);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            { backgroundColor: color, width: `${pct * 100}%` },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={styles.label}>
          {value}/{max}
        </Text>
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
    height: 8,
    backgroundColor: '#2a2a4a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  label: {
    color: AppColors.textSecondary,
    fontSize: 12,
    minWidth: 36,
    textAlign: 'right',
  },
});
