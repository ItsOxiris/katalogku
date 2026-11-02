import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';

// Figma: HeaderBar (dipakai di Masuk, Daftar, Pesanan, Status Pesanan)
// Tombol kembali hanya muncul jika props onBack dikirim.
export default function HeaderBar({ title, subtitle, onBack, rightIcon = 'cafe-outline', onRightPress }) {
  const colors = useColors();
  const insets = useSafeAreaInsets(); // jarak aman dari notch/status bar

  return (
    <View
      style={[
        styles.bar,
        { paddingTop: insets.top + 12, backgroundColor: colors.background, borderBottomColor: colors.border },
      ]}
    >
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={10} style={styles.back}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
      ) : null}

      <View style={styles.titles}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{title}</Text>
        {subtitle ? <Text style={[styles.sub, { color: colors.muted }]}>{subtitle}</Text> : null}
      </View>

      {rightIcon ? (
        <Pressable onPress={onRightPress} disabled={!onRightPress} hitSlop={10} style={styles.right}>
          <Ionicons name={rightIcon} size={22} color={colors.accent} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 8,
  },
  back: { width: 38, height: 44, justifyContent: 'center' },
  titles: { flex: 1 },
  title: { fontFamily: FONTS.semibold, fontSize: 19 },
  sub: { marginTop: 2, fontFamily: FONTS.regular, fontSize: 11 },
  right: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
});
