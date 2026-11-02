import { useColorScheme } from 'react-native';
import { COLORS, DARK_COLORS } from './colors';

// Hook: otomatis memilih palet sesuai mode terang/gelap HP.
export default function useColors() {
  return useColorScheme() === 'dark' ? DARK_COLORS : COLORS;
}
