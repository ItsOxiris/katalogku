import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useColors from '../theme/useColors';
import { FONTS } from '../theme/fonts';
import { formatRupiah } from '../utils/format';
import Badge from './Badge';
import Rating from './Rating';

// Figma: ProductCard (radius 12, foto 1:1, body padding 12)
export default function Card({
  title,
  price,
  image,
  category,
  rating,
  badge,
  discount,            // latihan: angka persen, mis. 10 -> label "-10%"
  isFavorite = false,
  soldOut = false,
  onPress,
  onToggleFavorite,
  onAdd,
}) {
  const colors = useColors();
  const hargaAkhir = discount ? price * (100 - discount) / 100 : price;

  return (
    <Pressable
      onPress={soldOut ? undefined : onPress}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <View style={[styles.imageWrap, { backgroundColor: colors.surfaceWarm }]}>
        <Image source={{ uri: image }} style={[styles.image, soldOut && styles.soldImage]} />

        {badge ? <Badge type={badge} style={styles.badge} /> : null}

        {discount ? (
          <View style={[styles.discount, { backgroundColor: colors.danger }]}>
            <Text style={[styles.discountText, { color: colors.onPrimary }]}>-{discount}%</Text>
          </View>
        ) : null}

        {onToggleFavorite ? (
          <Pressable
            onPress={onToggleFavorite}
            hitSlop={8}
            style={[styles.fav, { backgroundColor: colors.card }]}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={16}
              color={isFavorite ? colors.brand : colors.muted}
            />
          </Pressable>
        ) : null}

        {soldOut ? (
          <View style={[styles.soldLabel, { backgroundColor: colors.overlay }]}>
            <Text style={[styles.soldText, { color: colors.onPrimary }]}>Habis hari ini</Text>
          </View>
        ) : null}
      </View>

      <View style={[styles.body, soldOut && styles.soldBody]}>
        <View style={styles.meta}>
          <Text style={[styles.category, { color: colors.muted }]} numberOfLines={1}>
            {category}
          </Text>
          {rating != null ? <Rating value={rating} size={10} compact /> : null}
        </View>

        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.bottom}>
          <View>
            {discount ? (
              <Text style={[styles.oldPrice, { color: colors.muted }]}>{formatRupiah(price)}</Text>
            ) : null}
            <Text style={[styles.price, { color: colors.accent }]}>{formatRupiah(hargaAkhir)}</Text>
          </View>
          {onAdd && !soldOut ? (
            <Pressable
              onPress={onAdd}
              hitSlop={8}
              style={[styles.add, { backgroundColor: colors.surfaceWarm, borderColor: colors.border }]}
            >
              <Ionicons name="add" size={18} color={colors.brand} />
            </Pressable>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, margin: 6, borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  imageWrap: { width: '100%', aspectRatio: 1 },
  image: { width: '100%', height: '100%' },
  soldImage: { opacity: 0.45 },
  badge: { position: 'absolute', top: 10, left: 8 },
  discount: { position: 'absolute', bottom: 8, left: 8, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5 },
  discountText: { fontFamily: FONTS.semibold, fontSize: 10 },
  fav: { position: 'absolute', top: 6, right: 6, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  soldLabel: { position: 'absolute', left: 0, right: 0, top: '42%', paddingVertical: 9, alignItems: 'center' },
  soldText: { fontFamily: FONTS.medium, fontSize: 11 },
  body: { padding: 12 },
  soldBody: { opacity: 0.5 },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 4 },
  category: { flex: 1, fontFamily: FONTS.regular, fontSize: 11 },
  title: { marginTop: 4, minHeight: 38, fontFamily: FONTS.medium, fontSize: 12, lineHeight: 19 },
  bottom: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  oldPrice: { fontFamily: FONTS.regular, fontSize: 10, textDecorationLine: 'line-through' },
  price: { fontFamily: FONTS.semibold, fontSize: 13 },
  add: { width: 28, height: 28, borderRadius: 7, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
