import { StyleSheet, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppTheme } from '@/context/theme-context';

interface LevelBadgeProps {
  level: number;
  locked?: boolean;
}

export function LevelBadge({ level, locked = false }: LevelBadgeProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: locked ? colors.locked : colors.levelBadge },
      ]}
    >
      {locked && (
        <IconSymbol name="lock.fill" size={12} color={colors.lockedIcon} />
      )}
      <Text style={[styles.text, { color: locked ? colors.lockedIcon : '#fff' }]}>
        LEVEL {level}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
    marginBottom: 12,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
