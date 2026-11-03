import { useColorScheme } from 'react-native';
import { COLORS, DARK_COLORS } from './colors';

export default function useColors() {
  return useColorScheme() === 'dark' ? DARK_COLORS : COLORS;
}
