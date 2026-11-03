import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
  style,
}) {
  const colors = useColors();

  const VARIANTS = {
    primary: { bg: colors.primary, border: colors.primary, text: colors.onPrimary },
    outline: { bg: 'transparent', border: colors.brand, text: colors.brand },
    danger: { bg: colors.danger, border: colors.danger, text: colors.onPrimary },
  };
  const v = VARIANTS[variant] || VARIANTS.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: v.bg, borderColor: v.border },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={v.text} /> : null}
      <Text style={[styles.text, { color: v.text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
  text: { fontFamily: FONTS.medium, fontSize: 14 },
});
