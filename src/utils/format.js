// 28000 -> "Rp28.000"
export function formatRupiah(angka) {
  const bulat = Math.round(Number(angka) || 0);
  return 'Rp' + String(bulat).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
