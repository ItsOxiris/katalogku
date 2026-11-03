const LABEL = {
  kopi: 'Kopi',
  'non-kopi': 'Non-Kopi',
  'makanan-berat': 'Makanan Berat',
  'snack-pastry': 'Snack & Pastry',
};

export function labelKategori(kategori) {
  if (!kategori) return '';
  if (LABEL[kategori]) return LABEL[kategori];
  return String(kategori)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (huruf) => huruf.toUpperCase());
}
