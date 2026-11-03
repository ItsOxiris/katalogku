import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';

export default function CategoryChips({ items, selected, onSelect, getLabel = (x) => x }) {
  const colors = useColors();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}
    >
      {items.map((item) => {
        const aktif = item === selected;
        return (
          <Pressable
            key={item}
            onPress={() => onSelect(item)}
            style={[
              styles.chip,
              { backgroundColor: colors.card, borderColor: colors.border },
              aktif && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
          >
            <Text style={[styles.text, { color: aktif ? colors.onPrimary : colors.muted }]}>
              {getLabel(item)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingHorizontal: 16, paddingBottom: 8, gap: 8 },
  chip: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
  },
  text: { fontFamily: FONTS.regular, fontSize: 12 },
});
