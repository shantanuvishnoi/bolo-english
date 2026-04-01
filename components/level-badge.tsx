import { StyleSheet, Text, View } from 'react-native';

import { AppColors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface LevelBadgeProps {
  level: number;
  locked?: boolean;
}

export function LevelBadge({ level, locked = false }: LevelBadgeProps) {
  return (
    <View style={[styles.container, locked && styles.lockedContainer]}>
      {locked && (
        <IconSymbol name="lock.fill" size={12} color={AppColors.lockedIcon} />
      )}
      <Text style={[styles.text, locked && styles.lockedText]}>
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
    backgroundColor: AppColors.levelBadge,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
    marginBottom: 12,
  },
  lockedContainer: {
    backgroundColor: AppColors.locked,
  },
  text: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  lockedText: {
    color: AppColors.lockedIcon,
  },
});
