import { useState } from 'react';
import { View, ScrollView, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Rating from '../components/Rating';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { labelKategori } from '../utils/category';
import { formatRupiah } from '../utils/format';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';

export default function DetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const product = DUMMY_PRODUCTS[0];

  const [ukuran, setUkuran] = useState('Regular');
  const [suhu, setSuhu] = useState('Es');
  const [qty, setQty] = useState(1);

  const minuman = product.category === 'kopi' || product.category === 'non-kopi';
  const hargaSatuan = product.price + (minuman && ukuran === 'Large' ? 5000 : 0);
  const total = hargaSatuan * qty;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar title="Detail Menu" />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={{ uri: product.thumbnail }}
          style={[styles.image, { backgroundColor: colors.surfaceWarm }]}
        />

        <View style={styles.content}>
          <View style={styles.metaRow}>
            <Text style={[styles.category, { color: colors.accent }]}>
              {labelKategori(product.category).toUpperCase()}
            </Text>
            <Rating value={product.rating} size={13} />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
          <Text style={[styles.price, { color: colors.accent }]}>{formatRupiah(product.price)}</Text>
          <Text style={[styles.desc, { color: colors.muted }]}>{product.description}</Text>

          {product.badge ? <Badge type={product.badge} style={styles.badge} /> : null}

          {minuman ? (
            <>
              <OptionGroup
                title="Ukuran"
                options={[{ label: 'Regular' }, { label: 'Large', extra: '+Rp5.000' }]}
                value={ukuran}
                onChange={setUkuran}
              />
              <OptionGroup
                title="Suhu"
                options={[{ label: 'Es' }, { label: 'Panas' }]}
                value={suhu}
                onChange={setSuhu}
              />
            </>
          ) : null}

          <View style={styles.favButton}>
            <Button title="Tambah ke Favorit" icon="heart-outline" variant="outline" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottom,
          { paddingBottom: insets.bottom + 12, backgroundColor: colors.card, borderTopColor: colors.border },
        ]}
      >
        <View style={[styles.stepper, { borderColor: colors.border }]}>
          <Pressable hitSlop={8} onPress={() => setQty(Math.max(1, qty - 1))} style={styles.stepBtn}>
            <Ionicons name="remove" size={18} color={colors.brand} />
          </Pressable>
          <Text style={[styles.qty, { color: colors.text }]}>{qty}</Text>
          <Pressable hitSlop={8} onPress={() => setQty(qty + 1)} style={styles.stepBtn}>
            <Ionicons name="add" size={18} color={colors.brand} />
          </Pressable>
        </View>
        <Button
          title={`Tambah ke Pesanan · ${formatRupiah(total)}`}
          style={styles.orderButton}
          onPress={() => Alert.alert('Pesanan', `${qty}× ${product.title} ditambahkan`)}
        />
      </View>
    </View>
  );
}

function OptionGroup({ title, options, value, onChange }) {
  const colors = useColors();
  return (
    <View style={[styles.group, { borderTopColor: colors.border }]}>
      <View style={styles.groupHead}>
        <Text style={[styles.groupTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.groupHint, { color: colors.muted }]}>Pilih satu</Text>
      </View>
      <View style={styles.options}>
        {options.map((opt) => {
          const aktif = opt.label === value;
          return (
            <Pressable
              key={opt.label}
              onPress={() => onChange(opt.label)}
              style={[
                styles.option,
                { backgroundColor: colors.card, borderColor: colors.border },
                aktif && { backgroundColor: colors.surfaceWarm, borderColor: colors.brand },
              ]}
            >
              <Text style={[styles.optionText, { color: aktif ? colors.brand : colors.text }]}>
                {opt.label}
              </Text>
              {opt.extra ? (
                <Text style={[styles.optionExtra, { color: colors.muted }]}>{opt.extra}</Text>
              ) : null}
              {aktif ? <Ionicons name="checkmark" size={14} color={colors.brand} /> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 24 },
  image: { width: '100%', aspectRatio: 1.25 },
  content: { padding: 20 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  category: { fontFamily: FONTS.medium, fontSize: 10, letterSpacing: 1.8 },
  title: { marginTop: 10, fontFamily: FONTS.semibold, fontSize: 23, lineHeight: 32 },
  price: { marginTop: 4, fontFamily: FONTS.semibold, fontSize: 20 },
  desc: { marginTop: 12, fontFamily: FONTS.regular, fontSize: 14, lineHeight: 24 },
  badge: { alignSelf: 'flex-start', marginTop: 14 },
  group: { marginTop: 20, paddingTop: 18, borderTopWidth: 1 },
  groupHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  groupTitle: { fontFamily: FONTS.semibold, fontSize: 13 },
  groupHint: { fontFamily: FONTS.regular, fontSize: 10 },
  options: { flexDirection: 'row', gap: 8 },
  option: {
    flex: 1,
    height: 44,
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  optionText: { fontFamily: FONTS.regular, fontSize: 12 },
  optionExtra: { fontFamily: FONTS.regular, fontSize: 9 },
  favButton: { marginTop: 24 },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
  },
  stepBtn: { width: 34, height: 44, alignItems: 'center', justifyContent: 'center' },
  qty: { minWidth: 18, textAlign: 'center', fontFamily: FONTS.medium, fontSize: 13 },
  orderButton: { flex: 1, paddingHorizontal: 10 },
});
