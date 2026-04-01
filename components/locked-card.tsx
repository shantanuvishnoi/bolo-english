import { StyleSheet, Text, View } from 'react-native';

import { AppColors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface LockedCardProps {
  message?: string;
}

export function LockedCard({ message = 'Complete previous level to unlock' }: LockedCardProps) {
  return (
    <View style={styles.card}>
      <IconSymbol name="lock.fill" size={28} color={AppColors.lockedIcon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.locked,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#3a3a5a',
  },
  text: {
    color: AppColors.lockedIcon,
    fontSize: 14,
    fontWeight: '500',
  },
});
