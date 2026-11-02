import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';

// Figma: CustomInput (state = default | error)
// Field tinggi 50, radius 12, padding 14. icon = nama Ionicons di kiri (latihan).
// ...rest diteruskan ke TextInput (placeholder, value, onChangeText, secureTextEntry, dll).
export default function CustomInput({ label, error, icon, style, ...rest }) {
  const colors = useColors();

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={[styles.label, { color: colors.text }]}>{label}</Text> : null}

      <View
        style={[
          styles.field,
          { backgroundColor: colors.card, borderColor: error ? colors.danger : colors.border },
        ]}
      >
        {icon ? <Ionicons name={icon} size={18} color={colors.muted} /> : null}
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholderTextColor={colors.muted}
          {...rest}
        />
      </View>

      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { marginBottom: 8, fontFamily: FONTS.medium, fontSize: 14 },
  field: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: { flex: 1, height: '100%', fontFamily: FONTS.regular, fontSize: 14 },
  error: { marginTop: 6, fontFamily: FONTS.regular, fontSize: 11 },
});
