import { useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import CafeHeader from '../components/CafeHeader';
import CustomInput from '../components/CustomInput';
import CategoryChips from '../components/CategoryChips';
import Card from '../components/Card';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { labelKategori } from '../utils/category';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';

const URUTAN = ['Terpopuler', 'Termurah', 'Termahal'];
const FOTO_BANNER =
  'https://images.unsplash.com/photo-1565252556328-92ee4a9a0983?auto=format&fit=crop&w=900&q=80';

export default function HomeScreen() {
  const colors = useColors();
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 4 : width >= 500 ? 3 : 2;

  const [query, setQuery] = useState('');
  const [kategori, setKategori] = useState('Semua');
  const [urutan, setUrutan] = useState('Terpopuler');

  const products = DUMMY_PRODUCTS;
  const categories = ['Semua', ...new Set(products.map((p) => p.category))];

  const data = products
    .filter(
      (p) =>
        (kategori === 'Semua' || p.category === kategori) &&
        p.title.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => {
      if (urutan === 'Termurah') return a.price - b.price;
      if (urutan === 'Termahal') return b.price - a.price;
      return b.rating - a.rating;
    });

  const bagianAtas = (
    <View>
      <View style={styles.banner}>
        <Image source={{ uri: FOTO_BANNER }} style={styles.bannerImage} />
        <View style={[styles.bannerShade, { backgroundColor: colors.imageShade }]} />
        <View style={styles.bannerText}>
          <Text style={[styles.bannerEyebrow, { color: colors.brandLight }]}>PROMO HARI INI</Text>
          <Text style={[styles.bannerTitle, { color: colors.onPrimary }]}>Diskon 50%</Text>
          <Text style={[styles.bannerSub, { color: colors.onPrimary }]}>
            Untuk minuman kedua, setiap pukul 14.00–16.00
          </Text>
        </View>
      </View>

      <Text style={[styles.label, { color: colors.muted }]}>Urutkan</Text>
      <CategoryChips items={URUTAN} selected={urutan} onSelect={setUrutan} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CafeHeader />

      <View style={styles.search}>
        <CustomInput
          icon="search"
          placeholder="Cari menu..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      <CategoryChips
        items={categories}
        selected={kategori}
        onSelect={setKategori}
        getLabel={(k) => (k === 'Semua' ? k : labelKategori(k))}
      />

      <FlatList
        key={numColumns}
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={bagianAtas}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>Menu tidak ditemukan</Text>
        }
        renderItem={({ item }) => (
          <View style={{ width: `${100 / numColumns}%` }}>
            <Card
              title={item.title}
              price={item.price}
              image={item.thumbnail}
              category={labelKategori(item.category)}
              rating={item.rating}
              badge={item.badge}
              soldOut={item.stock === 0}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4 },
  searchInput: { marginBottom: 8 },
  list: { paddingHorizontal: 10, paddingBottom: 24 },
  banner: {
    height: 150,
    marginHorizontal: 6,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: { width: '100%', height: '100%' },
  bannerShade: { ...StyleSheet.absoluteFillObject },
  bannerText: { position: 'absolute', left: 16, bottom: 16, right: 16 },
  bannerEyebrow: { fontFamily: FONTS.medium, fontSize: 9, letterSpacing: 1.5 },
  bannerTitle: { fontFamily: FONTS.bold, fontSize: 26, marginTop: 2 },
  bannerSub: { fontFamily: FONTS.regular, fontSize: 11, opacity: 0.9 },
  label: { marginLeft: 6, marginBottom: 8, fontFamily: FONTS.medium, fontSize: 11 },
  empty: { textAlign: 'center', marginTop: 40, fontFamily: FONTS.regular },
});
