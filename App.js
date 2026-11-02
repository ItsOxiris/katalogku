import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import useColors from './src/theme/useColors';

export default function App() {
  const colors = useColors();
  const scheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: scheme === 'dark' ? colors.accent : colors.primary }]}>
        KatalogKu
      </Text>
      <Text style={[styles.sub, { color: colors.muted }]}>Setup berhasil!</Text>
      <Text style={[styles.mode, { color: colors.muted }]}>
        Mode: {scheme === 'dark' ? 'gelap' : 'terang'}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold' },
  sub: { marginTop: 8 },
  mode: { marginTop: 4, fontSize: 12 },
});