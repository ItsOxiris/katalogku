import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';

export default function Badge({ type = 'bestseller', style }) {
  const colors = useColors();
  const TYPES = {
    bestseller: { label: 'Best Seller', bg: colors.badgeWarm, fg: colors.badgeWarmText },
    baru: { label: 'Baru', bg: colors.primary, fg: colors.onPrimary },
    vegan: { label: 'Vegan', bg: colors.successSoft, fg: colors.success, icon: 'leaf-outline' },
    habis: { label: 'Habis hari ini', bg: colors.overlay, fg: colors.onPrimary },
  };
  const t = TYPES[type] || TYPES.bestseller;

  return (
    <View style={[styles.badge, { backgroundColor: t.bg }, style]}>
      {t.icon ? <Ionicons name={t.icon} size={10} color={t.fg} /> : null}
      <Text style={[styles.text, { color: t.fg }]}>{t.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
  },
  text: { fontFamily: FONTS.medium, fontSize: 9 },
});
