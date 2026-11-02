import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';

// Tantangan Modul 3: bintang sesuai nilai rating 0–5.
// compact = 1 bintang + angka (dipakai di kartu menu, sesuai Figma).
export default function Rating({ value = 0, count, size = 12, compact = false }) {
  const colors = useColors();
  const nilai = Math.max(0, Math.min(5, Number(value) || 0));

  if (compact) {
    return (
      <View style={styles.row}>
        <Ionicons name="star" size={size} color={colors.star} />
        <Text style={[styles.value, { fontSize: size, color: colors.text }]}>
          {nilai.toFixed(1)}
        </Text>
      </View>
    );
  }

  const bintang = [1, 2, 3, 4, 5].map((i) =>
    nilai >= i ? 'star' : nilai >= i - 0.5 ? 'star-half' : 'star-outline',
  );

  return (
    <View style={styles.row}>
      {bintang.map((nama, i) => (
        <Ionicons key={i} name={nama} size={size} color={colors.star} />
      ))}
      <Text style={[styles.value, { fontSize: size - 1, color: colors.text }]}>
        {nilai.toFixed(1)}
      </Text>
      {count != null ? (
        <Text style={[styles.count, { fontSize: size - 3, color: colors.muted }]}>
          ({count} ulasan)
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  value: { fontFamily: FONTS.regular, marginLeft: 3 },
  count: { fontFamily: FONTS.regular, marginLeft: 4 },
});
