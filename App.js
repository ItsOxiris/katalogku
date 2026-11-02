import { useState } from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import HeaderBar from './src/components/HeaderBar';
import Button from './src/components/Button';
import Card from './src/components/Card';
import CustomInput from './src/components/CustomInput';
import Rating from './src/components/Rating';
import useColors from './src/theme/useColors';
import { FONTS } from './src/theme/fonts';

// App.js sementara untuk menguji komponen Modul 3 (diganti di Modul 4–5).
const FOTO_KOPI = 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80';
const FOTO_CROISSANT = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <UjiKomponen />
    </SafeAreaProvider>
  );
}

function UjiKomponen() {
  const colors = useColors();
  const [nama, setNama] = useState('');
  const [cari, setCari] = useState('');
  const [favorit, setFavorit] = useState(true);

  const Judul = ({ children }) => (
    <Text style={[styles.section, { color: colors.muted }]}>{children}</Text>
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <HeaderBar
        title="KatalogKu"
        subtitle="Uji coba komponen"
        onBack={() => Alert.alert('HeaderBar', 'Tombol kembali ditekan')}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Judul>CUSTOMINPUT</Judul>
        <CustomInput icon="search" placeholder="Cari menu..." value={cari} onChangeText={setCari} />
        <CustomInput
          label="Nama"
          placeholder="Tulis nama..."
          value={nama}
          onChangeText={setNama}
          error={nama === '' ? 'Nama wajib diisi' : null}
        />

        <Judul>BUTTON</Judul>
        <Button title="Sapa" icon="hand-left-outline" onPress={() => Alert.alert('Halo', nama || 'tanpa nama')} />
        <View style={styles.gap} />
        <Button title="Reset" variant="outline" onPress={() => setNama('')} />
        <View style={styles.gap} />
        <Button title="Hapus" variant="danger" icon="trash-outline" onPress={() => Alert.alert('Hapus', 'Contoh tombol danger')} />
        <View style={styles.gap} />
        <Button title="Nonaktif" disabled />

        <Judul>CARD</Judul>
        <View style={styles.row}>
          <Card
            title="Es Kopi Susu Gula Aren"
            category="Kopi"
            price={28000}
            image={FOTO_KOPI}
            rating={4.8}
            badge="bestseller"
            discount={10}
            isFavorite={favorit}
            onToggleFavorite={() => setFavorit(!favorit)}
            onPress={() => Alert.alert('Card', 'Buka detail menu')}
            onAdd={() => Alert.alert('Card', 'Ditambahkan ke pesanan')}
          />
          <Card
            title="Butter Croissant"
            category="Snack & Pastry"
            price={25000}
            image={FOTO_CROISSANT}
            rating={4.9}
            badge="vegan"
            soldOut
            onToggleFavorite={() => {}}
          />
        </View>

        <Judul>RATING</Judul>
        <Rating value={3.5} count={120} size={16} />
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  section: { marginTop: 16, marginBottom: 10, fontFamily: FONTS.medium, fontSize: 10, letterSpacing: 1.5 },
  gap: { height: 12 },
  row: { flexDirection: 'row', marginHorizontal: -6 },
});
