import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';

export default function CafeHeader({ subtitle = 'Meja 12 · Dine-in', stamps = 7, stampTotal = 10 }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingTop: insets.top + 14, backgroundColor: colors.primary }]}>
      <View style={styles.left}>
        <View style={styles.nameRow}>
          <Ionicons name="cafe-outline" size={24} color={colors.brandLight} />
          <Text style={[styles.name, { color: colors.onPrimary }]}>
            Katalog<Text style={{ color: colors.brandLight }}>Ku</Text>
          </Text>
        </View>
        <Text style={[styles.sub, { color: colors.onPrimary }]}>{subtitle}</Text>
      </View>

      <View style={[styles.pill, { backgroundColor: colors.onPrimarySoft, borderColor: colors.onPrimarySoft }]}>
        <Ionicons name="cafe-outline" size={14} color={colors.onPrimary} />
        <Text style={[styles.pillText, { color: colors.onPrimary }]}>
          {stamps}/{stampTotal} <Text style={styles.pillSmall}>stamp</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  left: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontFamily: FONTS.semibold, fontSize: 22, letterSpacing: -0.8 },
  sub: { marginTop: 2, fontFamily: FONTS.regular, fontSize: 11, opacity: 0.8 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: { fontFamily: FONTS.semibold, fontSize: 11 },
  pillSmall: { fontFamily: FONTS.regular, fontSize: 9 },
});
