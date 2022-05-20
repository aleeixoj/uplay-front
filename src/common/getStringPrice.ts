export function getStringPrice(price: number): string {
  return Number(price).toFixed(2).toString().replace('.', ',');
}
