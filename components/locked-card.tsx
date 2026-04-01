import { StyleSheet, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppTheme } from '@/context/theme-context';

interface LockedCardProps {
  message?: string;
}

export function LockedCard({ message = 'Complete previous level to unlock' }: LockedCardProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.locked,
          borderColor: colors.lockedBorder,
        },
      ]}
    >
      <IconSymbol name="lock.fill" size={28} color={colors.lockedIcon} />
      <Text style={[styles.text, { color: colors.lockedIcon }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
